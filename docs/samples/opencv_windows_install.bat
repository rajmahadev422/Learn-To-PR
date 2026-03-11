@REM Run this script after installing MSYS2, git, cmake and gcc
@REM This script will build your OpenCV with the latest version of Opencv

mkdir build && cd build

echo "Making files..."
cmake -G "MinGW Makefiles" ../

echo "Building OpenCV..."
mingw32-make -j 4

echo "Installing OpenCV..."
mingw32-make install
echo "Done!"