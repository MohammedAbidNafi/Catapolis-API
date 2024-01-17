# Catapolis-API

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.tsx
```

This project was created using `bun init` in bun v1.0.22. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Example 

Here is a website which uses CatapolisAPI
<code>https://catapolis.web.app</code>

## API Documentation

Base URL for all endpoints
<code class="language-plaintext highlighter-rouge">https://catapolis.fun</code></p>

<p><em>The response time will be blazing fast cause all facts are stored in Redis Database.</em></p>

<h2 id="endpoints">Endpoints</h2>
<p><a href="/facts"><code class="language-plaintext highlighter-rouge">/facts</code></a>
Retrieve facts</p>

<p><a href="/submit.html"><code class="language-plaintext highlighter-rouge">/submit-fact</code></a>*
Submit facts</p>

<p><sub> Please be sensible and dont spam we are still working on security of this. </sub></p>

<h2 id="models">Models</h2>
<p><a href="/facts"><code class="language-plaintext highlighter-rouge">Fact</code></a>
An animal fact</p>

<p><a href="/submit.html"><code class="language-plaintext highlighter-rouge">Submit Fact</code></a>
Submit your cat facts here</p>
