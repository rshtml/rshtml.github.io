---
layout: default
---

## 🚀 Introduction

RsHtml is a powerful template engine that transforms your HTML templates into highly efficient Rust code at compile time, allowing you to seamlessly use Rust logic and expressions together with HTML to harness the full power of Rust for dynamic content generation. It is designed to help you build flexible and maintainable web applications.

## 📦 Installation & Setup

### 1. Add to `Cargo.toml`

<u><strong>Cargo.toml:</strong></u>

```toml
[dependencies]
rshtml = "{{ site.rshtml_version }}"

# rshtml = { version = "{{ site.rshtml_version }}", features = ["functions"] }

# For RsHtml derive macro, the default folder can be changed.
# This is the default setup:
#[package.metadata.rshtml]
#views = { path = "views", extract_file_on_debug = false }
```
* To use the helper functions, the `functions` feature must be enabled.
* For RsHtml derive macro:

    By default, view files are expected to be located in a views folder at the project's root. In debug mode, you can configure it to output the generated code to a file, which is then included to provide the implementation. The default configuration is as follows:

<u><strong>Cargo.toml:</strong></u>
```toml
[package.metadata.rshtml]
views = { path = "views", extract_file_on_debug = false }
```

With this configuration, the resulting paths for a struct like HomePage would be:

- **View File:** &lt;project-root&gt;/views/home.rs.html
- **Extracted File:** &lt;project-root&gt;/target/rshtml/HomePage.rs

## 🧩 Editor Support

-   **[tree-sitter-rshtml](https://github.com/rshtml/tree-sitter-rshtml){:target="_blank" rel="noopener noreferrer"}:** Provides robust and efficient parsing for accurate syntax highlighting and code analysis.
-   **[Language Server](https://github.com/rshtml/rshtml-analyzer){:target="_blank" rel="noopener noreferrer"}:** Provides core features like autocompletion, syntax highlighting and error checking.

You can download the compiled `rshtml-analyzer` language server suitable for your system from the [Releases Page](https://github.com/rshtml/rshtml-analyzer/releases){:target="_blank" rel="noopener noreferrer"} or use following command:
```bash
cargo install --git https://github.com/rshtml/rshtml-analyzer.git --tag v{{ site.lsp_version }}
```
---
<br/>

> ***Editor support for `RsHtml` is available for a variety of modern code editors. Click on your supported editor from the list below to visit the repository and find installation instructions:***

[![VS Code](https://img.shields.io/badge/VS%20CODE-2D72A4?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcwLjkxMTkgOTkuMzE3MUM3Mi40ODY5IDk5LjkzMDcgNzQuMjgyOCA5OS44OTE0IDc1Ljg3MjUgOTkuMTI2NEw5Ni40NjA4IDg5LjIxOTdDOTguNjI0MiA4OC4xNzg3IDEwMCA4NS45ODkyIDEwMCA4My41ODcyVjE2LjQxMzNDMTAwIDE0LjAxMTMgOTguNjI0MyAxMS44MjE4IDk2LjQ2MDkgMTAuNzgwOEw3NS44NzI1IDAuODczNzU2QzczLjc4NjIgLTAuMTMwMTI5IDcxLjM0NDYgMC4xMTU3NiA2OS41MTM1IDEuNDQ2OTVDNjkuMjUyIDEuNjM3MTEgNjkuMDAyOCAxLjg0OTQzIDY4Ljc2OSAyLjA4MzQxTDI5LjM1NTEgMzguMDQxNUwxMi4xODcyIDI1LjAwOTZDMTAuNTg5IDIzLjc5NjUgOC4zNTM2MyAyMy44OTU5IDYuODY5MzMgMjUuMjQ2MUwxLjM2MzAzIDMwLjI1NDlDLTAuNDUyNTUyIDMxLjkwNjQgLTAuNDU0NjMzIDM0Ljc2MjcgMS4zNTg1MyAzNi40MTdMMTYuMjQ3MSA1MC4wMDAxTDEuMzU4NTMgNjMuNTgzMkMtMC40NTQ2MzMgNjUuMjM3NCAtMC40NTI1NTIgNjguMDkzOCAxLjM2MzAzIDY5Ljc0NTNMNi44NjkzMyA3NC43NTQxQzguMzUzNjMgNzYuMTA0MyAxMC41ODkgNzYuMjAzNyAxMi4xODcyIDc0Ljk5MDVMMjkuMzU1MSA2MS45NTg3TDY4Ljc2OSA5Ny45MTY3QzY5LjM5MjUgOTguNTQwNiA3MC4xMjQ2IDk5LjAxMDQgNzAuOTExOSA5OS4zMTcxWk03NS4wMTUyIDI3LjI5ODlMNDUuMTA5MSA1MC4wMDAxTDc1LjAxNTIgNzIuNzAxMlYyNy4yOTg5WiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=)](https://github.com/rshtml/vscode){:target="_blank" rel="noopener noreferrer"}
[![VSCodium](https://img.shields.io/badge/VSCODIUM-OPEN%20VSIX-2D72A4?style=for-the-badge&logo=vscodium)](https://github.com/rshtml/vscode){:target="_blank" rel="noopener noreferrer"}&nbsp;&nbsp;&nbsp;&nbsp;
[![Neovim](https://img.shields.io/badge/Neovim-008080?style=for-the-badge&logo=neovim)](https://github.com/rshtml/neovim){:target="_blank" rel="noopener noreferrer"}&nbsp;&nbsp;&nbsp;&nbsp;
[![Zed](https://img.shields.io/badge/Zed-0651cf?style=for-the-badge&label=&message=ZED&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQ0IDE0NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkgMTMuNUM5IDExLjAxNDcgMTEuMDE0NyA5IDEzLjUgOUgxMjguNjM2TDExMi44ODYgMjQuNzVIMzMuNzVDMjguNzc5NCAyNC43NSAyNC43NSAyOC43Nzk0IDI0Ljc1IDMzLjc1VjkwSDMzLjc1VjMzLjc1SDEwMy44ODZMODguMTM2IDQ5LjVINTYuMjVDNTIuNTIyMSA0OS41IDQ5LjUgNTIuNTIyMSA0OS41IDU2LjI1VjY3LjVINTguNVY1OC41SDc5LjEzNkw1LjE1OTAxIDEzMi40NzdDMC45MDY3NTcgMTM2LjcyOSAzLjkxODM3IDE0NCA5LjkzMTk4IDE0NEgxMzAuNUMxMzcuOTU2IDE0NCAxNDQgMTM3Ljk1NiAxNDQgMTMwLjVWMzEuNUgxMzVWMTMwLjVDMTM1IDEzMi45ODUgMTMyLjk4NSAxMzUgMTMwLjUgMTM1SDE1LjM2NEwzMS4xMTQgMTE5LjI1SDExMC4yNUMxMTUuMjIxIDExOS4yNSAxMTkuMjUgMTE1LjIyMSAxMTkuMjUgMTEwLjI1VjU0SDExMC4yNVYxMTAuMjVINDAuMTE0TDU1LjU4MjcgOTQuNzgxMkg4Ny43NUM5MS40Nzc5IDk0Ljc4MTIgOTQuNSA5MS43NTkyIDk0LjUgODguMDMxMlY3Ni41SDg1LjVWODUuNzgxMkg2NC41ODI3TDEzOC44NDEgMTEuNTIzQzE0My4wOTMgNy4yNzA3MyAxNDAuMDgyIDAgMTM0LjA2OCAwSDEzLjVDNi4wNDQxNiAwIDAgNi4wNDQxNiAwIDEzLjVWMTEyLjVIOVYxMy41WiIgZmlsbD0id2hpdGUiLz48L3N2Zz4g)](https://github.com/rshtml/zed){:target="_blank" rel="noopener noreferrer"}&nbsp;&nbsp;&nbsp;&nbsp;
[![Helix](https://img.shields.io/badge/HELIX-643EB2?style=for-the-badge&logo=helix)](#helix)

#### ***Helix***

Add the following language setting to your `languages.toml` file:

```toml
[[language]]
name = "rshtml"
file-types = [{ glob = "*.rs.html" }]
scope = "source.rshtml"
language-servers = [
  "rshtml-analyzer",
  "vscode-html-language-server",
  "superhtml",
]
grammar = "rshtml"
roots = ["Cargo.lock", "Cargo.toml"]
block-comment-tokens = { start = "@*", end = "*@" }
indent = { tab-width = 2, unit = "  " }

[language-server.rshtml-analyzer]
command = "rshtml-analyzer"
args = ["--stdio"]

[[grammar]]
name = "rshtml"
source = { git = "https://github.com/rshtml/tree-sitter-rshtml", rev = "363c52c1630c491a5094ef5b369f12b4b858392a" }
```

You can download the compiled `rshtml-analyzer` code suitable for your system from the [Releases Page](https://github.com/rshtml/rshtml-analyzer/releases){:target="_blank" rel="noopener noreferrer"} or use following command:
```bash
cargo install --git https://github.com/rshtml/rshtml-analyzer.git --tag v{{ site.lsp_version }}
```

In tree-sitter, you must copy the files in the `tree-sitter-rshtml/queries/` folder to the `runtime/queries/rshtml/` location in the `helix config folder`.

It should look like this:

`~/.config/helix/runtime/queries/rshtml/highlights.scm`  
`~/.config/helix/runtime/queries/rshtml/injections.scm`

It can be checked by the `hx --health rshtml` command.

<hr/>

***Support for other editors is planned for the future. If you would like to see support for an editor that isn't listed, please open an issue to let us know.***

## ✨ v! Macro

The `v!` macro is a procedural macro that allows you to write well-structured HTML (where all opened tags must be properly closed) while embedding Rust code using rust blocks (`{}`). It produces a portable view type and internally uses a closure-based implementation.

The type generated by the `v!` macro implements the `View` trait, which means it can be passed around as `impl View` or returned as a return type. Inside the HTML content, you can also embed Rust expressions in attribute values using rust blocks (`{}`). The rust block is evaluated and its result is injected directly into the output, so it expects an expression. The returned value must implement either the `Display` or the `View` trait.  
The `v!` macro is a simple yet powerful tool that allows you to dynamically compose HTML fragments with Rust and build complex views by combining them together.

**Simple example usage of the `v!` macro**
```rust
use rshtml::{traits::View, v};
use std::fmt;

fn main() -> fmt::Result {
    let template = "RsHtml";
    let hello = v!(<p>Hello {template}</p>);

    let mut out = String::with_capacity(hello.text_size());

    hello.render(&mut out)?;

    print!("{out}");

    Ok(())
}
```

Some examples of usage:

```rust
fn foo() -> impl View {
    let x = 5;
    let s = String::from("hi");

    v!(this is x: {x}, this is s: {s})
}

fn bar() -> Box<dyn View> {
    let x = 5;
    let s = String::from("hey");

    if x == 5 {
        v!(this is x: {x}, this is s: {s}).boxed()
    } else {
        v!(oooo).boxed()
    }
}

fn try() {
    let mut numbers = Vec::new();
    for i in 0..10 {
        numbers.push(v!(<li>{i}</li>));
    }

    let res = v!(
        {card()}

        {bar()}

        <ul>
            {&numbers}
        </ul>
    );
}

```

### The View Trait

The `View` trait is the core trait used by the `v!` macro. By implementing the `View` trait for your own struct, you can integrate your custom types with the `v!` macro and use it seamlessly within templates.

Usage Example:

```rust
struct Home {
    title: String,
    count: i32,
}

impl View for Home {
    fn render(&self, out: &mut dyn Write) -> fmt::Result {
        v!(<div>Home Page, title:{&self.title}, count:{self.count}</div>)(out)
    }
}

#[test]
fn view_trait() {
    let mut out = String::with_capacity(24);

    let home = Home {
        title: "home title".to_owned(),
        count: 7,
    };

    home.render(&mut out).unwrap();

    assert_eq!(
        out,
        "<div> Home Page , title : home title , count : 7 </div>"
    )
}

```

#### The `view_iter()` Iterator Extension

To pass iterator results into a view without calling `collect`, use the `view_iter()` extension function.  
This function is provided as a trait extension for iterator types and allows views to consume iterators directly.

**Example**

```rust
let card_views = cards
    .iter()
    .map(|card| v!(<div class="card">{&card.title}</div>))
    .view_iter(); // extension function

v! {
    <div>
        { card_views }
    </div>
}
```

The `view_iter()` function enables efficient rendering of iterator output inside views, avoiding unnecessary allocations.

#### The `boxed()` Function

The `boxed()` function is provided for wrapping views inside a `Box`.  
It can be used to erase concrete view types and unify return types when working with conditional branches.

##### Example

```rust
fn do_boxed() -> Box<dyn View> {
    let x = 5;
    let s = String::from("hi");

    if x == 5 {
        v!(this is x: {x}, this is s: {s}).boxed()
    } else {
        v!(oooo).boxed()
    }
}
```

The `boxed(`) function enables returning dynamically dispatched views by boxing them into a `Box<dyn View>`.

## 🧱 RsHtml Derive Macro

### 1. Define a Struct

The `RsHtml derive macro` automatically handles the implementation of the `RsHtml trait` for your structs.
It provides two ways to determine the template file path: by inference or by an explicit path.

**Path Inference (Default Behavior)**

By default, if no parameters are specified, the macro infers the template path from
the struct's name using the following convention:

    1. It removes the Page suffix from the struct name.
    2. It converts the remaining part of the name to lowercase using `snake_case` method.
    3. It appends the .rs.html extension.

**Example:**
For a struct named `HomePage`, the inferred path will be `home.rs.html`.

**Explicit Path (Overriding Inference)**

You can override the default inference by providing an explicit path with the
`#[rshtml(path = "...")]` attribute. This forces `RsHtml` to use the specified file.

**Example:**
With `#[rshtml(path="index.rs.html")]`, `RsHtml` will look for the `index.rs.html` file,
ignoring the struct's name for path resolution.

**Turn off warnings:**

`RsHtml` warnings can be disabled by providing the `no_warn` parameter; otherwise, warnings will appear in the build output. `#[rshtml(no_warn)]`.

<u><strong>Struct Definition:</strong></u>

```rust
use rshtml::{RsHtml, traits::RsHtml};

#[derive(RsHtml)]
// #[rshtml(path="index.rs.html", no_warn)]
struct HomePage {
    username: String,
    items: Vec<String>,
}
```

### 2. Render The Template

Once your struct is defined, you can render its corresponding template by creating
an instance of the struct and then calling the `.render()` method.
This method returns a `Result<String, std::fmt::Error>` containing the final HTML output.

**Accessing Data and Logic in the View**

Inside your `.rs.html` template, you have full access to the
fields and methods of your struct instance through the `self` keyword.

```razor
    <p>Welcome, @self.title</p>
    <span>Your formatted name is: @self.get_formatted_name()</span>
```

<u><strong>Template Rendering:</strong></u>

```rust
fn main() {
    let page = HomePage {
        title: "RsHtml".to_string(),
        items: vec!["Item 1".to_string(), "Item 2".to_string()],
    };

    let html_output = page.render().unwrap();
    println!("{}", html_output);
}
```

### 3. Tracking Template Changes

> 💡 **Optional, Highly Recommended**

To ensure that `cargo` automatically recompiles your project when a template file is modified,
you can create a `build.rs` file in the root of your project.
This improves the development experience by making sure your
changes are always reflected without needing a full `cargo clean`.

<u><strong>build.rs:</strong></u>

```rust
use rshtml::track_views_folder;

fn main() {
    // This function tells cargo to re-run the build script if
    // any file inside the configured views directory changes.
    track_views_folder();
}
```

### Core Syntax Reference

#### Expressions

`@expression / @(expression)`

RsHtml allows seamless integration of Rust logic through expressions,
which are evaluated at render time. All expressions begin with the `@` prefix.

***Rust's Ownership Rules Still Apply***

A core principle of RsHtml is that it doesn't hide Rust's power—or its rules.
The template content is translated into a Rust function at compile time.
Consequently, all expressions you write must adhere to Rust's strict
`ownership and borrowing model`.

**Simple Expressions**

Simple variable access, function calls,
or field lookups can be written directly following the `@` prefix.

```razor
<h1>Welcome, @self.username</h1>
<p>You have @self.items.len() items.</p>
```

**Parenthesized Expressions**

For more complex expressions that might be ambiguous,
you should enclose them in parentheses: `@(...)`.
This ensures the entire expression is parsed and evaluated as a single unit.

```razor
<p>Final price: @(item.cost + item.tax)</p>
<p>@((self.value * 10).pow(2))</p>
```

#### Control Flows & Loops

> ℹ️ Inside these blocks, the closing brace `}` character has a special meaning,
> as it marks the end of the block. You can use `{` and `}` in a balanced way, meaning that every opening brace must be closed.

##### Conditions: `@if / else / else if`

The syntax for RsHtml control flows,
is defined as `@<directive> <rust-expression> { <inner-template> } ..`

```razor
@if self.items.is_empty() {
    <p>You have no items.</p>
} else {
    <p>Here are your items.</p>
}
```

```razor
@if self.count == 0 {
    <p>You have no items.</p>
} else if self.count == 1 {
    <p>You have one item.</p>
} else {
    <p>Here are your items.</p>
}
```

##### Loops: `@for / @while`

RsHtml allows you to use Rust's native `@for` and `@while` loops to generate
repetitive template content.

The syntax mirrors standard Rust. You can write your loop expression,
followed by a block { ... } containing the template to be rendered for each iteration.
Inside the block, you can freely mix HTML with other Rust expressions,
which must be prefixed with `@`.

```razor
<ul>
    @for item in &self.items {
        <li>@item</li>
    }

    <table>
        @for (index, user) in self.users.iter().enumerate() {
            <tr>
                <td>@(index + 1)</td>
                <td>@user.name</td>
            </tr>
        }
    </table>
</ul>
```

With `continue` and `break` directives:

```razor
@for i in 0..10 {
    @if i == 3 {
        @continue
    }

    @if i == 8 {
        @break
    }

    <p>it is @i</p>
}
```

```razor
@while count < 10 {
    <p> Counter is: @count </p>
    @(count += 1)
}
```

##### Pattern Matching: `@match`

The arms of an @match expression in RsHtml are highly flexible.

- **Single-Line Content:** For simple cases, you can provide a single-line expression,
  which can be a Rust value or a line of HTML.
- **Block Content:** For more complex output, you can provide a template block `{ ... }`.
  This block acts as an `"inner template"` and can contain any valid RsHtml content,
  including HTML tags and other directives.

```razor
@match self.value {
    0 => {<p>this is zero: @self.value</p>},
    1 => <p>this is one</p>,
    2 => self.value,
    3 | 4 => (i * 3),
    _ => <p>this is bigger than four</p>,
}
```

#### Comments

`@* ... *@`

```razor
@* this is server side comment, it will not appear in the html output *@
```

#### Rust Code Blocks

`@{...}`

You can embed larger chunks of Rust logic using `@{ ... }` blocks.
This allows you to declare variables and perform complex operations.

```razor
@{
    let s = "hello";

     fn inline_function() -> String {
        "inline function".to_string()
     }

     for i in 0..10 {
        println!("Item {}", i);
     }

     let message = "I Love RsHtml!";
}

<p>@message</p>
```

#### Raw Output

`@raw { ... }`

There may be times when you need to output a block of content exactly as it is,
without any processing by the RsHtml engine. For this purpose, you can use a `@raw { ... }` block.

Everything inside a `@raw` block is rendered directly to the output as raw,
unprocessed text. All RsHtml syntax, including expressions, control flow directives,
and comments, will be ignored and treated as literal text.

```razor
@raw {
    <p>this is raw block @self.value</p>
    @self.my_func()

    <h2>{{ message }}</h2>
    <p>Count value: {{ count }}</p>
}
```

**Output:**

```text
<p>this is raw block @self.value</p>
@self.my_func()

<h2>{{ message }}</h2>
<p>Count value: {{ count }}</p>
```

#### Rendering & Escaping
`@#` ~ `@@`

##### Raw Rendering (The @# Prefix)

By default, RsHtml prioritizes security. Any output from a Rust expression
`(@self.my_var)` is automatically HTML-escaped.
This means characters like `<` and `>` are converted to `&lt;` and `&gt;`, which prevents
Cross-Site Scripting (XSS) attacks by ensuring that string variables cannot inject malicious HTML.

However, there are times when you need to render raw HTML that you've generated in your
Rust code and trust completely. To bypass the default escaping mechanism,
you can prefix your expression with `@#`.

```razor
@* --- Default, Safe Rendering --- *@
@* The HTML tags will be visible as plain text. *@
<div>@self.my_var</div>

@* --- Raw, Unescaped Rendering --- *@
@* The string is rendered as actual HTML. *@
<div>@#self.my_var</div>
```
*Renders as:*
```html
<div>&lt;p&gt;This is &lt;strong&gt;bold&lt;&#x2F;strong&gt; text.&lt;&#x2F;p&gt;</div>
<div><p>This is <strong>bold</strong> text.</p></div>
```

**The @ Character**

The `@` symbol always has a special meaning. To output a literal `@` character anywhere
in your template, you must escape it as `@@`.

```razor
<p>Follow us on: @@rshtml_engine</p>
```

*Renders as: `<p>Follow us on: @rshtml_engine</p>`*

### Components

Components are reusable, self-contained pieces of UI that encapsulate both markup and logic.
They are the building blocks of a modern, maintainable architecture.

A component is simply another .rs.html template that can accept parameters (props) and render child content.

#### Defining a Component

A component is defined in its own `.rs.html` file. It can access parameters passed to
it and can specify where to render any **"child content"** it receives.

**Template Parameters @(name: Type)**

Component parameters must be defined at the very top of the file, excluding whitespace. The parameters passed to the component should be specified here. Parameters are defined using the syntax `@(count: i32, name: &str, title)`. If a type is not specified as in the third parameter of the example, it implies that the parameter expects a type implementing `Display`.

Furthermore, if a component parameter is passed as a block (e.g., `<Component title = {this is block}/>`), it is treated as an untyped parameter. When rendering, it should be printed as `@#title` to disable escaping; otherwise, printing it as `@title` will apply escaping to the entire content. However, if the block parameter is accepted with an explicit type, the application of escaping becomes irrelevant. The type for a block parameter is `Block<impl Render>`. Example usage includes `@(title: Block<impl Render>)` or simply `@(title)`.

When providing component parameters at the call site, the name is significant rather than the order. A parameter passed with the name `title` will be captured by the name `title`. If no additional processing is required on the parameters and they are intended solely for rendering to the screen, they can be utilized directly without explicit typing.

***components/Card.rs.html***
```razor
@(title, footer, content: String) @* Component parameters *@

<p>
@title
</p>

@footer

@(content.to_uppercase())
```

***Card usage***
```razor
<Card title="title" footer={<p>footer</p>}, content=@content />
```

**@child_content Directive**

The `@child_content / @child_content()` directive is a special marker used inside a component's template.
It indicates the exact location where the nested content, passed from
the parent template, should be rendered.

```razor
@child_content
@child_content() @* Parentheses are also allowed *@
```

***components/Card.rs.html***

```razor
@(title) @* This component expects a 'title' parameter. *@
<div class="card">
    <div class="card-header">
        @title @* title prop rendered here. *@
    </div>
    <div class="card-body">
        @* Any content passed to the component will be rendered here. *@
        @child_content 
    </div>
</div>
```

#### Importing Components

`@use "path/to/component.rs.html" as Component`

Before you can use a component, you must import it using the `@use` directive.

- **With an Alias:** as ComponentName lets you assign a specific, easy-to-use name for
  the component within the current template.
- **Without an Alias:** If you omit as, RsHtml will automatically use
  the component's file name (without the extension) as its name.
  For example, `@use "components/Alert.rs.html"` makes the component available as `Alert`.

```razor
@* Import with a custom alias *@
@use "components/Card.rs.html" as Card

@* Import using the default name (will be available as 'Alert') *@
@use "components/Alert.rs.html"

@* It can also be used without the rs.html extension and the extension is added automatically. *@
@use "components/Alert"
@use "components/Alert" as Alert
```

#### Using Components

`<Component title=@self.title is_ok=true />`

**Important Naming Convention:** When using the tag syntax,
the component name must begin with a capital letter `(PascalCase)`.
This is the critical rule that allows RsHtml to distinguish a custom component
like `<UserProfile>` from a standard HTML tag like `<p>`.

> - ✅ **Correct:** `<Alert message="..."/>`
> - ❌ **Incorrect:** `<alert ... />` (This would be treated as a literal HTML tag)


- **Self-Closing:** If a component doesn't need any child content, you can use a
  self-closing tag: `<MyComponent/>`.
- **With Child Content:** To pass content to be rendered by `@child_content`,
  use standard opening and closing tags.

```razor
@use "components/Alert.rs.html"

@* A self-closing component with a 'message' attribute *@
<Alert message="This is a warning."/>

@* A component with nested child content *@
<Alert message="Operation successful!">
    <p>Your data was saved correctly.</p>
    <a href="/home">Go back</a>
</Alert>
```

#### Passing Data (Parameters & Attributes)

Data can be passed to components using attributes: `<Component attributes />`. RsHtml supports several data types:

-   **String Literals:** `title="Hello World"`
-   **Numbers:** `count=42` or `price=99.9`
-   **Booleans:** `is_active=true`
-   **Rust Expressions:** `user=@self.current_user` or `items=@(vec![1, 2, 3])`
-   **Template Blocks:** `header={ <h3>My Header</h3> }`

This powerful feature allows you to pass not just simple values,
but also complex Rust data and even other rendered chunks of HTML as parameters.

```razor
@use "components/ComplexCard.rs.html" as Card

<Card
    title="Dynamic Card"
    is_published=true
    view_count=@self.page_views
    header={
        <div class="custom-header">
            Rendered from a template block! @self.data
        </div>
    }
/>
```

## 🛠️ Helper Functions
RsHtml includes a set of built-in helper functions that are automatically available
in all your templates. These utilities are designed to simplify common tasks like
JSON serialization and date/time formatting.

To take advantage of built-in helper functions within your templates, you first need to enable the functions feature. This requires two steps:

**1. Enable the feature in `Cargo.toml`**

```toml
rshtml = { version = "*", features = ["functions"] }
```

**2. Import the `functions` in your Rust code**

```rust
use rshtml::{RsHtml, functions::*, traits::RsHtml};
```


### json()
`json<T: Serialize>(value: &T) -> String`

Serializes a given Rust value into a JSON string, ready for use in JavaScript.

```razor
<script>
    const userData = @#json(&self.current_user);
    console.log("User ID:", userData.id);
</script>
```

*Renders as:*
```html
<script>
    const userData = {"id":1,"username":"Ferris"};
    console.log("User ID:", userData.id);
</script>
```

### json_let()
`json_let<T: Serialize>(name: &str, value: &T) -> String`

Converts a given Rust value into JSON and wraps it directly in a JavaScript `let` variable declaration.

```razor
<script>
    @#json_let("user", &self.current_user);
    console.log("Username:", user.username);
</script>
```

*Renders as:*
```html
<script>
  let user = {"id":1,"username":"Ferris"};
  console.log("Username:", user.username);
</script>
```

### time()
`time(value: &impl Display) -> RsDateTime`

Takes a date/time value and converts it into a special
RsDateTime object that can be easily formatted with chainable methods.

By default, it formats the date and time in a `YYYY-MM-DD HH:MM:SS` format.

```razor
<p>Published on: @time(&self.post_created_at)</p>
```

**The .pretty() Formatter:**

For a more human-readable date format, you can chain the .pretty() method.
```razor
<p>Published on: @time(&self.post_created_at).pretty()</p>
```
*Renders a date like: Jan 01, 2025*

**Formatting can be done with the `format` method:**
```razor
<p>Published on: @time(&self.post_created_at).format("%A, %B %e, %Y")</p>
```
*Renders something like: Wednesday, January 1, 2025*

## 🤝 Contributing

Contributions are welcome! Please visit our
[GitHub repository](https://github.com/rshtml/rshtml)
to open issues or submit pull requests.

## 📜 License

RsHtml is licensed under your choice of the
`MIT License` or the
`Apache License`.
