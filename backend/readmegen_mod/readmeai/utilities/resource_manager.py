"""Utility that builds the full path for package resource files."""

from importlib import resources
from pathlib import Path

from ..core.errors import FileReadError
from ..core.logger import get_logger

_logger = get_logger(__name__)

_package = "readmegen_mod.readmeai.config"
# def build_resource_path(
#     file_path: str,
#     module: str = _package,
#     submodule: str = "settings",
# ) -> Path:
#     """Retrieves the path to a resource file within the package.

#     Tries importlib.resources first, falls back to pkg_resources.
#     """
#     try:
#         return resources.files(module).joinpath(submodule, file_path)

#     except (TypeError, FileNotFoundError) as e:
#         _logger.error(f"Error loading resource file via importlib.resources: {e}")

#     try:
#         import pkg_resources

#         submodule = submodule.replace(".", "/")
#         return Path(
#             pkg_resources.resource_filename(
#                 module,
#                 f"{submodule}/{file_path}",
#             ),
#         ).resolve()

#     except Exception as e:
#         raise FileReadError(
#             f"Failed to load resource file: {file_path} from {module}.{submodule}",
#         ) from e

# def build_resource_path(
#     file_path: str,
#     module: str = _package,
#     submodule: str = "settings",
# ) -> Path:
#     """Retrieves the path to a resource file within the package."""
#     try:
#         # Use the absolute path for the resource
#         if submodule:
#             # If submodule is provided, join it with the module
#             full_module_path = f"{module}.{submodule}" if "." not in submodule else module
#             return resources.files(full_module_path).joinpath(file_path)
#         else:
#             # If no submodule, just use the module
#             return resources.files(module).joinpath(file_path)

#     except (TypeError, FileNotFoundError) as e:
#         _logger.error(f"Error loading resource file via importlib.resources: {e}")

#     try:
#         import pkg_resources
        
#         # Fix how submodule is handled for pkg_resources
#         if submodule:
#             resource_path = f"{submodule}/{file_path}" if "/" not in submodule else f"{file_path}"
#         else:
#             resource_path = file_path
            
#         return Path(
#             pkg_resources.resource_filename(
#                 module,
#                 resource_path,
#             ),
#         ).resolve()

#     except Exception as e:
#         raise FileReadError(
#             f"Failed to load resource file: {file_path} from {module}.{submodule}",
#         ) from e

def build_resource_path(
    file_path: str,
    module: str = _package,
    submodule: str = "settings", # Default to empty string if no specific submodule
) -> Path:
    """Retrieves the path to a resource file within the package."""
    try:
        target_package = module
        if submodule:
            # Ensure submodule is dot-separated if it represents a deeper package path
            # If submodule already contains dots, assume it's a full path extension
            # If it contains slashes, convert them to dots
            normalized_submodule = submodule.replace("/", ".")
            if not normalized_submodule.startswith("."): # Ensure it's a relative extension
                 target_package = f"{module}.{normalized_submodule}"
            else: # if it starts with a dot, it might be an attempt at relative pathing we want to avoid
                 target_package = f"{module}{normalized_submodule}"


        _logger.debug(f"Attempting to load resource '{file_path}' from package '{target_package}'")
        return resources.files(target_package).joinpath(file_path)

    except (TypeError, FileNotFoundError, ModuleNotFoundError) as e: # Added ModuleNotFoundError
        _logger.error(f"Error loading resource file '{file_path}' from package '{target_package}' via importlib.resources: {e}")

    # Fallback to pkg_resources (ensure this logic is also robust)
    try:
        import pkg_resources
        
        # For pkg_resources, the resource path is relative to the 'module' package
        # and uses slashes.
        resource_path_for_pkg = file_path
        if submodule: # If submodule was originally like "settings/templates"
            resource_path_for_pkg = f"{submodule.replace('.', '/')}/{file_path}"
            
        _logger.debug(f"Attempting fallback with pkg_resources for '{resource_path_for_pkg}' in module '{module}'")
        return Path(
            pkg_resources.resource_filename(
                module, # pkg_resources usually takes the base package
                resource_path_for_pkg,
            ),
        ).resolve()

    except Exception as e:
        _logger.error(f"Fallback pkg_resources failed for '{file_path}' from '{module}' (submodule: '{submodule}'): {e}")
        raise FileReadError(
            f"Failed to load resource file: {file_path} from module {module} (submodule: {submodule})",
        ) from e