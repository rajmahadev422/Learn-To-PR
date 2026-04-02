# Building OpenCV on Windows from Source Code using MSYS2 UCRT64 and VS Code (C++)

| | |
| -: | :- |
| Original author | Mahadev Kumar |
| Compatibility | OpenCV >= 4.x |

> This tutorial was tested on Windows >= 7 using the MSYS2 UCRT64 environment.
> The OpenCV team does not maintain MSYS/Cygwin configuration and does not regularly test it with continuous integration.

---

## Introduction

This tutorial explains how to build OpenCV from source on Windows using the **MSYS2 UCRT64 toolchain** and use it inside **Visual Studio Code with C++**.

The build configuration uses:

- **MSYS2 (UCRT64 shell)**
- **GCC (UCRT toolchain)**
- **CMake**
- **mingw32-make**
- **VS Code**

This method produces **native Windows binaries linked against the Universal C Runtime (UCRT)**.

---

## Prerequisites

Install the following software before proceeding:

- [MSYS2](https://www.msys2.org)
- [Git](https://git-scm.com/install)
- [Visual Studio Code](https://code.visualstudio.com)

After installing MSYS2, always open the:

### MSYS2 UCRT64 Terminal

> Do not use the `MSYS`, `MinGW64`, or `CLANG64` shells for this build.

---

## Step 1: Update MSYS2

Open the **MSYS2 UCRT64** terminal and update the system.

:::code

```bash
pacman -Syu
```

:::

> Restart the terminal if prompted.

---

## Step 2: Install Required Packages

### Install the required compiler and build tools

:::code

```bash
pacman -S mingw-w64-ucrt-x86_64-gcc \
          mingw-w64-ucrt-x86_64-cmake \
          mingw-w64-ucrt-x86_64-make
```

:::

### Verify installation

:::code

```bash
gcc --version
cmake --version
mingw32-make --version
```

:::

> **Add the following directory to your `Windows PATH`:**

:::code

```plaintext
C:\msys64\ucrt64\bin
```

:::

---

## Step 3: Clone OpenCV Source Code

Clone `OpenCV` and optional `contrib modules`.

:::code

```bash
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv_contrib.git
```

:::

---

## Step 4: Create Build Directory

:::code

```bash
cd opencv
mkdir build
cd build
```

:::
---

## Step 5: Configure the Build with CMake

Run CMake using the **MinGW Makefiles generator**.

:::code

```bash
cmake -G "MinGW Makefiles" ../
```

:::

> If you do not want to use **opencv_contrib**, remove the `OPENCV_EXTRA_MODULES_PATH` option.

---

## Step 6: Build OpenCV

Compile OpenCV.

:::code

```bash
mingw32-make -j6
```

:::

> If the build fails due to memory limitations, reduce the job count.

Example: `mingw32-make -j4`

---

## Step 7: Install OpenCV

Install the compiled libraries.

:::code

```bash
mingw32-make install
```

:::

After installation, OpenCV will be located in:
`opencv/build/install`

Add the following directory to your **Windows PATH**:
:::code

```plaintext
C:\path\to\opencv\build\install\x64\mingw\bin
```

:::
---

## Step 8: Verify with a C++ Example

- Create a folder outside the OpenCV source directory.
Example: `first-project`
- Inside the folder create **main.cpp**

:::code

:::include{samples/cpp/videocapture_basic.cpp#l8-l55}

:::include{samples/python/videocapture_obsensor.py}

```text
python only for example not use for this tutorial
```

:::

- Create **CMakeLists.txt**

:::code

```cmake
cmake_minimum_required(VERSION 3.10)

project(OpenCVApp)

set(OpenCV_DIR "C:/path/to/opencv/build/install/lib/cmake/opencv4")

find_package(OpenCV REQUIRED)

add_executable(app main.cpp)

target_link_libraries(app ${OpenCV_LIBS})
```

:::

- Build the project.

:::code

```bash
mkdir build && cd build &&
cmake -G "MinGW Makefiles" .. &&
mingw32-make
```

:::

- Run the program.

:::code

```bash
./app.exe
```

:::

> If everything is configured correctly, a window should appear displaying a blank image.

---

## Troubleshooting

### CMake cannot find OpenCV

Ensure that `OpenCV_DIR` is set correctly.

:::code

```plaintext
set(OpenCV_DIR "C:/path/to/opencv/build/install/lib/cmake/opencv4")
```

:::

### mingw32-make not found

Make sure the following path is added to the Windows environment variable **PATH**: `C:\msys64\ucrt64\bin`

### Build fails due to memory limits

Reduce parallel build jobs: `mingw32-make -j2`

---

## Conclusion

You have successfully built OpenCV from source using **MSYS2 UCRT64** and verified it with a **C++ project in VS Code**.

This setup allows you to develop OpenCV-based C++ applications using a fully open-source toolchain on Windows.
