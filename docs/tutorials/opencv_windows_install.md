# Building OpenCV on Windows from Source Code using MSYS2 UCRT64 and VS Code (C++)

> **Note:** This tutorial was tested on **Windows >= 7** using the **MSYS2 UCRT64 environment**.

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

After installing MSYS2, always open the **MSYS2 UCRT64 Terminal**.

> **Note:** Do not use the `MSYS`, `MinGW64`, or `CLANG64` shells for this build.

---

## Step 1: Update MSYS2

Open the **MSYS2 UCRT64** terminal and update the system.

```bash
pacman -Syu
```

Restart the terminal if prompted.

---

## Step 2: Install Required Packages

Install the required compiler and build tools.

```bash
pacman -S mingw-w64-ucrt-x86_64-gcc \
      mingw-w64-ucrt-x86_64-cmake \
      mingw-w64-ucrt-x86_64-make
```

Verify installation:

```bash
gcc --version
cmake --version
mingw32-make --version
```

> **Note:** Add the following directory to your `Windows PATH`:
    ```text
    C:\msys64\ucrt64\bin
    ```

---

## Step 3: Clone OpenCV Source Code

Clone `OpenCV` and optional `contrib modules`.

```bash
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv_contrib.git
```

---

## Step 4: Create Build Directory

```bash
cd opencv
mkdir build
cd build
```

---

## Step 5: Configure the Build with CMake

Run CMake using the **MinGW Makefiles generator**.

```bash
cmake -G "MinGW Makefiles" ../
```

> **Note:** If you do not want to use **opencv_contrib**, remove the `OPENCV_EXTRA_MODULES_PATH` option.

---

## Step 6: Build OpenCV

Compile OpenCV.

```bash
mingw32-make -j6
```

> **Note:** If the build fails due to memory limitations, reduce the job count.

Example:

```bash
mingw32-make -j4
```

---

## Step 7: Install OpenCV

- Install the compiled libraries.

  ```bash
  mingw32-make install
  ```

- After installation, OpenCV will be located in: `opencv/build/install`

- Add the following directory to your **Windows PATH**:

  ```text
  C:\path\to\opencv\build\install\x64\mingw\bin
  ```

---

## Step 8: Verify with a C++ Example

1. Create a folder outside the OpenCV source directory (e.g., `first-project`)

2. Inside the folder, create **main.cpp**:

    ```cpp
    #include <opencv2/opencv.hpp>
    #include <iostream>

    int main() {
      std::cout << "OpenCV Version: " << CV_VERSION << std::endl;

      cv::Mat img = cv::Mat::zeros(400, 400, CV_8UC3);

      cv::imshow("OpenCV Test", img);
      cv::waitKey(0);

      return 0;
    }
    ```

3. Create **CMakeLists.txt**:

    ```t
    cmake_minimum_required(VERSION 3.10)

    project(OpenCVApp)

    # This path is present inside the `build/install`
    set(OpenCV_DIR "C:/path/to/opencv/build/install/lib/cmake/opencv4")

    find_package(OpenCV REQUIRED)

    add_executable(app main.cpp) # app is you executable file after project is compile inside build folder.

    target_link_libraries(app ${OpenCV_LIBS})
    ```

4. Build the project:

    ```bash
    mkdir build && cd build
    cmake -G "MinGW Makefiles" ..
    mingw32-make
    ```

5. Run the program:

    ```bash
    ./app.exe
    ```

> **Note:** If everything is configured correctly, a window should appear displaying a blank image.

---

## Using OpenCV in Visual Studio Code

Install the following extensions in **VS Code**:

- C/C++
- CMake Tools

Open your project folder in VS Code and configure the project using CMake:

```bash
cmake -G "MinGW Makefiles" ..
```

Build the project:

```bash
mingw32-make
```

Run the executable from the integrated terminal.

---

## Troubleshooting

### CMake cannot find OpenCV

Ensure that `OpenCV_DIR` is set correctly:

> **Note:** This path is present inside the build folder

```t
set(OpenCV_DIR "C:/path/to/opencv/build/install/lib/cmake/opencv4")
```

### mingw32-make not found

Make sure the following path is added to the Windows environment variable **PATH**: `C:\msys64\ucrt64\bin`

### Build fails due to memory limits

Reduce parallel build jobs:

```bash
mingw32-make -j 4
```

---

## Conclusion

You have successfully built OpenCV from source using **MSYS2 UCRT64** and verified it with a **C++ project in VS Code**. This setup allows you to develop OpenCV-based C++ applications using a fully open-source toolchain on Windows.
