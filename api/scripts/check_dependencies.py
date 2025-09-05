import tomllib
import sys

class DependencyNotPinnedError(Exception):
    def __init__(self, dependency):            
        super().__init__(f"Dependency {dependency} should be pinned using either ~= or ==")
            
def check_dependencies():
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

if __name__ == "__main__":
    if not check_dependencies():
        sys.exit(1)