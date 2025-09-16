import sys
import tomllib
from typing import Dict, List

from pydantic import BaseModel


class DependencyNotPinnedError(Exception):
    def __init__(self, dependency: str):
        super().__init__(
            f"Dependency {dependency} should be pinned using either ~= or =="
        )


class DependenciesNotSortedError(Exception):
    def __init__(self, dependencies: List[str]):
        received = ",".join(dependencies)
        expected = ",".join(sorted(dependencies))
        super().__init__(f"""Dependencies are not sorted alphabetically.
Received:{received}
Expected: {expected}""")


class Config(BaseModel):
    class Project(BaseModel):
        dependencies: List[str] = []

    project: Project
    dependency_groups: Dict[str, List[str]]


def load_config():
    with open("pyproject.toml", "rb") as f:
        data = tomllib.load(f)

    return Config(**data)


def check_dependencies_are_pinned():
    config = load_config()

    dependencies = config.project.dependencies

    for deps in config.dependency_groups.values():
        dependencies += deps

    for dependency in dependencies:
        if not ("~=" in dependency or "==" in dependency):
            raise DependencyNotPinnedError(dependency=dependency)

    return True


def check_alphabetically_sorted(deps: List[str]):
    if sorted(deps) != deps:
        raise DependenciesNotSortedError(deps)


def check_dependencies_are_sorted_alphabetically():
    config = load_config()

    check_alphabetically_sorted(config.project.dependencies)

    for dependencies in config.dependency_groups.values():
        check_alphabetically_sorted(dependencies)

    return True


if __name__ == "__main__":
    if not check_dependencies_are_pinned():
        sys.exit(1)

    if not check_dependencies_are_sorted_alphabetically():
        sys.exit(1)
