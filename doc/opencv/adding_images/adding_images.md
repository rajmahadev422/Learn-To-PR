# Adding (blending) two images using OpenCV
---

| | |
| --- | --- |
| [prev](#tutorials/core/mat_operations.markdown) | [next](#tutorials/core/basic_linear_transform/basic_linear_transform.markdown)
---

|    |    |
| -: | :- |
| Original author | Ana Huamán |
| Compatibility | OpenCV >= 3.0 |

> We will learn how to blend two images!
## Goal
----

In this tutorial you will learn:

- what is *linear blending* and why it is useful;
- how to add two images using **addWeighted()**

## Theory
------

> The explanation below belongs to the book [Computer Vision: Algorithms and Applications](http://szeliski.org/Book/) by Richard Szeliski

From our previous tutorial, we already know a bit of *Pixel operators*. An interesting dyadic
(two-input) operator is the *linear blend operator*:

$$ \f[g(x) = (1 - \alpha)f_{0}(x) + \alpha f_{1}(x)\f] $$

By varying \f$\alpha\f$ from \f$0 \rightarrow 1\f$, this operator can be used to perform a temporal
*cross-dissolve* between two images or videos, as seen in slide shows and film productions (cool,
eh?)

Source Code
-----------

:::code

:::include{samples/cpp/tutorial_code/core/AddingImages/AddingImages.cpp}

:::include{samples/java/tutorial_code/core/AddingImages/AddingImages.java}

:::include{samples/python/tutorial_code/core/AddingImages/adding_images.py}

```

[here](https://raw.githubusercontent.com/opencv/opencv/4.x/samples/cpp/tutorial_code/core/AddingImages/AddingImages.cpp)
[here](https://raw.githubusercontent.com/opencv/opencv/4.x/samples/java/tutorial_code/core/AddingImages/AddingImages.java)
[here](https://raw.githubusercontent.com/opencv/opencv/4.x/samples/python/tutorial_code/core/AddingImages/adding_images.py)

```

:::

Explanation
-----------

Since we are going to perform:

\f[g(x) = (1 - \alpha)f_{0}(x) + \alpha f_{1}(x)\f]

## We need two source images (\f$f_{0}(x)\f$ and \f$f_{1}(x)\f$). So, we load them in the usual way:

:::code

:::include{samples/cpp/tutorial_code/core/AddingImages/AddingImages.cpp#L39-L40}

:::include{samples/java/tutorial_code/core/AddingImages/AddingImages.java#L24-L25} 

:::include{samples/python/tutorial_code/core/AddingImages/adding_images.py#l19-l20}

:::

We used the following images:
![LinuxLogo.jpg](https://raw.githubusercontent.com/opencv/opencv/4.x/samples/data/LinuxLogo.jpg) and
![WindowsLogo.jpg](https://raw.githubusercontent.com/opencv/opencv/4.x/samples/data/WindowsLogo.jpg)

> Since we are *adding* *src1* and *src2*, they both have to be of the same size
(width and height) and type.

## Now we need to generate the `g(x)` image. For this, the function **addWeighted()** comes quite handy:

:::code
:::include{samples/cpp/tutorial_code/core/AddingImages/AddingImages.cpp#l47-l48}

:::include{samples/java/tutorial_code/core/AddingImages/AddingImages.java#l32-l33}

:::include{samples/python/tutorial_code/core/AddingImages/adding_images.py#l29-l30}

```py
    #Numpy version of above line (but cv function is around 2x faster):
    dst = np.uint8(alpha*(img1)+beta*(img2))
```

:::

since **addWeighted()**  produces:

\f[dst = \alpha \cdot src1 + \beta \cdot src2 + \gamma\f]
In this case, `gamma` is the argument \f$0.0\f$ in the code above.

## Create windows, show the images and wait for the user to end the program.

:::code
:::include{samples/cpp/tutorial_code/core/AddingImages/AddingImages.cpp#l52-l53}

:::include{samples/java/tutorial_code/core/AddingImages/AddingImages.java#l37-l38}

:::include{samples/python/tutorial_code/core/AddingImages/adding_images.py#l33-l34}

:::

Result
------

![](doc/tutorials/core/adding_images/images/Adding_Images_Tutorial_Result_Big.jpg)
