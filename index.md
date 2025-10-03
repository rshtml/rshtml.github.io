---
layout: default
---

## 🚀 Introduction

RsHtml is a powerful template engine that transforms
your HTML templates into highly efficient Rust code at **compile time**.
It allows you to seamlessly embed Rust logic and expressions directly
into your templates, harnessing the full power of Rust for
dynamic content generation.

It is designed to help you build well-structured and maintainable web applications.
By providing powerful tools for creating reusable components and
organizing page layouts, RsHtml makes it easier to manage the complexity
of your user interface as it grows.

In this guide, you will be introduced to `RsHtml`. If you would like to view practical examples, they are available at [`RsHtml Examples`](https://github.com/rshtml/examples){:target="_blank"}.

## 📦 Installation & Setup

### 1. Add to `Cargo.toml`

You can customize the view settings in your `Cargo.toml` file under the `[package.metadata.rshtml]` section.

By default, view files are expected to be located in a `views` folder at the project's root. The path to the `layout` file
is also relative to this views directory. In `debug mode`, you can configure it to output the generated code to a file, which is then included to provide the implementation. The default configuration is as follows:

```toml
[package.metadata.rshtml]
views = { path = "views", layout = "layout.rs.html", extract_file_on_debug = false }
```

With this configuration, the resulting paths for a struct like `HomePage` would be:

- **View File:** &lt;project-root&gt;/views/home.rs.html
- **Layout File:** &lt;project-root&gt;/views/layout.rs.html
- **Extracted File:** &lt;project-root&gt;/target/rshtml/HomePage.rs

<u><strong>Cargo.toml:</strong></u>

```toml
[dependencies]
rshtml = "0.3.0"

# The default folder and layout can be changed. This is the default setup:
#[package.metadata.rshtml]
#views = { path = "views", layout = "layout.rs.html", extract_file_on_debug = false }
```

### 2. Define a Struct

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

<u><strong>Struct Definition:</strong></u>

```rust
use rshtml::{RsHtml, traits::RsHtml};

#[derive(RsHtml)]
struct HomePage {
    username: String,
    items: Vec<String>,
}
```

### 3. Render The Template

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

### 4. Tracking Template Changes

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

### 5. Editor Support

RsHtml offers a rich editing experience powered by modern tooling. Our goal is to provide seamless integration with your favorite editors.

Core support is built upon:

-   **[tree-sitter-rshtml](https://github.com/rshtml/tree-sitter-rshtml){:target="_blank" rel="noopener noreferrer"}:** Provides robust and efficient parsing for accurate syntax highlighting and code analysis.
-   **[Language Server Protocol (LSP)](https://github.com/rshtml/rshtml-analyzer){:target="_blank" rel="noopener noreferrer"}:** Provides core features like autocompletion, syntax highlighting and error checking.

---
<br/>

> **Visual Studio Code**

[VS Code RsHtml Extension](https://marketplace.visualstudio.com/items?itemName=rshtml.rshtml){:target="_blank" rel="noopener noreferrer"}

The official `RsHtml for VS Code` extension is the best way to get started. It bundles the `tree-sitter` grammar and the `LSP` for a full-featured experience out of the box.

> **Helix**

Add the following language setting to your `languages.toml` file:

```toml
[[language]]
name = "rshtml"
file-types = [{ glob = "*.rs.html" }]
scope = "source.rshtml"
language-servers = ["rshtml-analyzer"]
grammar = "rshtml"
roots = ["Cargo.lock", "Cargo.toml"]
block-comment-tokens = { start = "@*", end = "*@" }

[language-server.rshtml-analyzer]
command = "rshtml-analyzer"
args = ["--stdio"]

[[grammar]]
name = "rshtml"
source = { git = "https://github.com/rshtml/tree-sitter-rshtml", rev = "699be8e06cef5e07678f6c13dd9ce4ca0d4cade7" }
```

You can download the compiled `rshtml-analyzer` code suitable for your system from the [Releases Page](https://github.com/rshtml/rshtml-analyzer/releases){:target="_blank" rel="noopener noreferrer"}.

In tree-sitter, you must copy the files in the `tree-sitter-rshtml/queries/` folder to the `runtime/queries/rshtml/` location in the `helix config folder`.

It should look like this:

`~/.config/helix/runtime/queries/rshtml/highlights.scm`  
`~/.config/helix/runtime/queries/rshtml/injections.scm`

It can be checked by the `hx --health rshtml` command.

> **Neovim**

Make sure to download the executable file suitable for your system from the `rshtml-analyzer` [Releases Page](https://github.com/rshtml/rshtml-analyzer/releases){:target="_blank" rel="noopener noreferrer"}.

Add the following code to the  `lsp/rshtml_analyzer.lua` file:
```lua
return {
  cmd = { 'rshtml-analyzer', '--stdio' },
  filetypes = { 'rshtml' },
  root_markers = { 'Cargo.toml', 'Cargo.lock' },
  single_file_support = true,
}
```

To define a file type, add the following code to your `init.lua` file:
```lua
vim.api.nvim_create_autocmd({ 'BufNewFile', 'BufRead' }, {
  pattern = '*.rs.html',
  callback = function()
    vim.bo.filetype = "rshtml"
  end,
})
```

To enable LSP, add the following code to your `init.lua` file:
```lua
vim.lsp.enable('rshtml-analyzer')
```

***These settings are provided for general guidance. You should adapt the LSP configuration to fit your specific setup.***

Support for other editors is planned for the future.

## ✨ Core Syntax Reference

### Expressions

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

### Control Flows & Loops

> ℹ️ Inside these blocks, the closing brace `}` character has a special meaning,
> as it marks the end of the block. If you need to render a literal closing brace `}`
> as text within a block, you must escape it by doubling it, like so: `@@}`.

#### Conditions: `@if / else / else if`

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

#### Loops: `@for / @while`

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
@while self.count < 10 {
    <p> Counter is: @self.count </p>
    @self.increment()
}
```

#### Pattern Matching: `@match`

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

### Comments

`@* ... *@`

```razor
@* this is server side comment, it will not appear in the html output *@
```

### Rust Code Blocks

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

### Raw Output

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

### Rendering & Escaping
`@#` ~ `@@`

#### Raw Rendering (The @# Prefix)

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

## 🧩️ Include Template

`@include("path/to/your/template.rs.html")`

The `@include` directive is one of the simplest yet most powerful tools for keeping your
templates organized. Think of it as a server-side `"copy-paste"` that inserts the content
of one template file directly into another.

*header.rs.html:*

```razor
<p>this is include part for content</p>
<div> @self.my_func() </div>
```

*home.rs.html:*

```razor
<div>
    <p>this is home page, @self.value</p>

    @include("header.rs.html")
</div>
```

Result after `include`,
*home.rs.html:*

```razor
<div>
    <p>this is home page, @self.value</p>

    <p>this is include part for content</p>
    <div> @self.my_func() </div>
</div>
```

## 🏛️ Layouts

### Extends

`@extends / @extends('path')`

The `@extends` directive is used to specify a layout for a template.

- **Placement:** If used, `@extends` must be the very first statement at the top of the file.
- **Specific Layout:** Use `@extends("path/to/layout.rs.html")` to inherit from a specific layout file.
- **Default Layout:** Use a standalone `@extends` to inherit from the project's pre-configured default layout.
- **No Layout:** If the `@extends` directive is omitted, the template will be **rendered without any layout**.

```razor
@extends("layout.rs.html")
```

### Section Directive

`@section('name','value')`

The inline `@section directive` allows you to define a section with a simple,
single-line value.
It takes two arguments: the section name (as a string) and the content,
which can be either a string literal or a Rust expression.

```razor
@section("section_name", "A string value")
@section("section_name", @self.rust_variable)
```

### Section Block

`@section name { ... }`

A `@section block` is the primary way to define a larger,
multi-line chunk of content that will be injected into a layout. You define a block
by specifying the section's name, followed by the content enclosed in curly braces `{}`.

```razor
@section menu {
    <p>this is section menu content @self.data</p>
}
```

### Default Content

Any content in a template that is **not** placed inside a named
`@section block` and `@section directive` is considered **default content**.
This content is automatically captured and can be rendered within a layout.

```razor
@extends("layout.rs.html")

@* This is the default content because it's not in a @section block. *@
<h1>A Simple Page</h1>
<p>No need to wrap this in a section block.</p>
```

### Render & Render Body

`@render('section_name') / @render_body`

A layout file acts as a template skeleton. To make it useful,
you need to tell it where to place the content from the pages that extend it.
This is done using two primary directives: `@render and @render_body`.

***@render("section_name")***

This directive is used to render a named section defined using `@section`.
It takes the name of the section as a string and injects its content at that location.
This is perfect for placing specific, named content blocks like
a page title, a sidebar, or custom scripts.

**@render_body**

This special directive is used to render the **default content** from an extending
template—that is, any content not wrapped in a named `@section` block.
It doesn't take any arguments and simply marks the spot where the main body
of the page should be placed.

```razor
@render_body
@render_body() @* Parentheses are also allowed *@
```

***render and render_body:***

```razor
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>@render("title") - My Website</title>
</head>
<body>
    <div class="container">
        <main>
            @render_body
        </main>
        <aside>
            @render("sidebar")
        </aside>
    </div>
</body>
</html>
```

In this layout:

- The `<title>` will be filled by a section named `"title"`.
- The `<main>` tag will be filled with the default, primary content of the page.
- The `<aside>` tag will be filled by a section named `"sidebar"`.


***The `has_section("section_name")` function and `layout` constant***

The `has_section()` function can be used to check if a section exists.

```razor
@if has_section("section_name") {
    <p>The section "section_name" exists.</p>
}
```

Additionally, the `layout` constant can be used to get the name of the current layout.

```razor
Layout name: @layout
```

## 🧱 Components

Components are reusable, self-contained pieces of UI that encapsulate both markup and logic.
They are the building blocks of a modern, maintainable architecture.

A component is simply another .rs.html template that can accept parameters (props) and render child content.

### Defining a Component

A component is defined in its own `.rs.html` file. It can access parameters passed to
it and can specify where to render any **"child content"** it receives.

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
@* This component expects a 'title' parameter. *@
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

### Importing Components

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

### Using Components

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

### Passing Data (Parameters & Attributes)

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
