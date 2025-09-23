import tomllib
from itertools import combinations
from pathlib import Path
from typing import Dict, List, Set

import pytest
from packaging.requirements import Requirement
from pydantic import BaseModel, Field


class Config(BaseModel):
    class Project(BaseModel):
        dependencies: List[str] = []

    project: Project
    dependency_groups: Dict[str, List[str]] = Field(alias="dependency-groups")


class DependenciesTest:
    @pytest.fixture(scope="session")
    def dependency_groups(self) -> List[List[str]]:
        pyproject_path = Path("pyproject.toml")

        with open(pyproject_path, "rb") as f:
            data = Config.model_validate(tomllib.load(f))

        groups = list(data.dependency_groups.values())
        groups.append(data.project.dependencies)
        return groups

    def should_be_pinned(self, dependency_groups: List[List[str]]):
        for dependencies in dependency_groups:
            for dependency in dependencies:
                assert "~=" in dependency or "==" in dependency

    def should_be_sorted_alphabetically(self, dependency_groups: List[List[str]]):
        for dependencies in dependency_groups:
            assert dependencies == sorted(dependencies)

    def should_not_have_overlaps_across_groups(
        self, dependency_groups: List[List[str]]
    ):
        dependencies_without_version: List[Set[str]] = []

        for dependencies in dependency_groups:
            dependencies_without_version.append(
                set(map(lambda dependency: Requirement(dependency).name, dependencies))
            )

        assert all(
            not (set1 & set2)
            for set1, set2 in combinations(dependencies_without_version, 2)
        )

    def should_not_have_duplicate_packages(self, dependency_groups: List[List[str]]):
        dependencies: Set[str] = set()

        for group in dependency_groups:
            for dependency in group:
                assert dependency not in dependencies
                dependencies.add(dependency)
