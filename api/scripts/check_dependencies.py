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


class ProjectConfig(BaseModel):
    dependencies: List[str] = []
    dependency_groups: Dict[str, List[str]]


def check_dependencies_are_pinned():
    with open("pyproject.toml", "rb") as f:
        data = tomllib.load(f)

    dependencies = data.get("project", {}).get("dependencies", [])

    dependency_groups = data.get("dependency-groups", {})
    for deps in dependency_groups.values():
        dependencies += deps

    for dependency in dependencies:
        if not ("~=" in dependency or "==" in dependency):
            raise DependencyNotPinnedError(dependency=dependency)

    return True


def check_alphabetically_sorted(deps: List[str]):
    if sorted(deps) != deps:
        raise DependenciesNotSortedError(deps)


def check_dependencies_are_sorted_alphabetically():
    with open("pyproject.toml", "rb") as f:
        data = tomllib.load(f)

    config = ProjectConfig(**data)

    check_alphabetically_sorted(config.dependencies)

    for dependencies in config.dependency_groups.values():
        check_alphabetically_sorted(dependencies)

    return True


if __name__ == "__main__":
    if not check_dependencies_are_pinned():
        sys.exit(1)

    if not check_dependencies_are_sorted_alphabetically():
        sys.exit(1)
