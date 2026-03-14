# How To use SymPy

SymPy is a powerful Python library for **symbolic mathematics**. Unlike standard numerical libraries (like NumPy), SymPy keeps variables as symbols and performs exact calculations.

Here is a comprehensive guide formatted as a `.md` file that covers the essentials.

---

```markdown
# Getting Started with SymPy

SymPy is a Python library for symbolic mathematics. It aims to become a full-featured computer algebra system (CAS) while keeping the code as simple as possible in order to be comprehensible and easily extensible.

## 1. Installation and Setup

To get started, install SymPy using pip:

```bash
pip install sympy

```

In your Python script or Jupyter Notebook, it is common practice to import the library and initialize pretty printing:

```python
from sympy import symbols, init_printing
init_printing(use_unicode=True)

```

## 2. Symbols vs. Variables

In SymPy, you must explicitly define symbols before using them in expressions.

```python
from sympy import symbols

# Define symbols
x, y = symbols('x y')

# Create an expression
expr = x + 2*y
print(expr) # Output: x + 2*y

```

## 3. Core Operations

### Expansion and Factoring

SymPy can manipulate algebraic expressions with ease.

```python
from sympy import expand, factor

expr = (x + 1)**2

# Expand: x^2 + 2x + 1
expanded_expr = expand(expr)

# Factor: (x + 1)^2
factored_expr = factor(expanded_expr)

```

### Substitution

Replace a symbol with a numerical value or another expression.

```python
expr = x**2 + 1
result = expr.subs(x, 2) # result = 5

```

## 4. Calculus

SymPy is excellent for performing exact calculus operations.

### Differentiation

$$ \frac{d}{dx}(sin(x)e^x) $$

```python
from sympy import diff, sin, exp

diff(sin(x) * exp(x), x)
# Output: exp(x)*sin(x) + exp(x)*cos(x)

```

### Integration

Find definite and indefinite integrals.

```python
from sympy import integrate, oo # oo is infinity

# Indefinite
integrate(exp(x)*sin(x) + exp(x)*cos(x), x)

# Definite (from 0 to infinity)
integrate(exp(-x**2), (x, 0, oo)) # Output: sqrt(pi)/2

```

## 5. Solving Equations

Use `solveset` to find roots of equations.

```python
from sympy import solveset, Eq

# Solve x^2 - 1 = 0
solveset(Eq(x**2, 1), x)
# Output: {-1, 1}

```

## 6. Matrices

SymPy handles matrices symbolically, allowing for exact inverses and determinants.

```python
from sympy import Matrix

M = Matrix([[1, x], [y, 1]])

# Determinant
det = M.det() # Output: 1 - x*y

# Square the matrix
M_sq = M**2

```

---

### Pro-Tip: Evaluation

If you have a symbolic result and want to convert it to a floating-point number, use the `.evalf()` method:

```python
from sympy import pi
pi.evalf(50)  # Gives pi to 50 decimal places

```

## 7. Useful Resources and Examples

To dive deeper into symbolic computation, explore these official resources and community examples:

* [Basic Mathematics](https://github.com/rajmahadev422/Learn-To-PR/blob/main/docs/samples/mathematics/Basic_math.ipynb)

* [Advanced Mathematics](https://github.com/rajmahadev422/Learn-To-PR/blob/main/docs/samples/mathematics/Adv_math.ipynb)

---

### Example: Solving a System of Linear Equations

If you want to see how SymPy handles multiple variables at once:

```python
from sympy import symbols, Eq, solve

x, y = symbols('x y')
eq1 = Eq(x + y, 5)
eq2 = Eq(x - y, 1)

solution = solve((eq1, eq2), (x, y))
# Output: {x: 3, y: 2}
