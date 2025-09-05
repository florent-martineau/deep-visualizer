import tomllib
import sys

class DependencyNotPinnedError(Exception):
    def __init__(self, dependency):            
        super().__init__(f"Dependency {dependency} should be pinned using either ~= or ==")
            

class DependenciesNotSortedError(Exception):
    def __init__(self, dependencies):            
        received = ','.join(dependencies)
        expected = ','.join(sorted(dependencies))
        super().__init__(f"Dependencies are not sorted alphabetically.\nReceived:{received}\nExpected {expected}")
            
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

def check_alphabetically_sorted(deps):
    if sorted(deps) != deps:
        raise DependenciesNotSortedError(deps)
            
def check_dependencies_are_sorted_alphabetically():
    with open("pyproject.toml", "rb") as f:
        data = tomllib.load(f)
    
    dependencies = data.get("project", {}).get("dependencies", [])
    check_alphabetically_sorted(dependencies=dependencies)

    dependency_groups = data.get("dependency-groups", {})
    for deps in dependency_groups.values():
        check_alphabetically_sorted(dependencies=deps)

    return True

if __name__ == "__main__":
    if not check_dependencies_are_pinned():
        sys.exit(1)

    if not check_dependencies_are_sorted_alphabetically():
        sys.exit(1)