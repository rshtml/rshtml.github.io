---
layout: default
title: Getting Started with RsHtml
---

# Getting Started with RsHtml

This guide will help you get started with using RsHtml in your Rust projects.

## 1. Installation

Add `rshtml` to your `Cargo.toml`:

```toml
[dependencies]
rshtml = "0.1.0" # Replace with the actual latest version
```

```rust
use rshtml::RsHtml;

#[derive(RsHtml)]
struct MyPage {
    title: String,
}

// Create a corresponding template file (e.g., my_page.rs.html)
// <h1>@self.title</h1>
```

