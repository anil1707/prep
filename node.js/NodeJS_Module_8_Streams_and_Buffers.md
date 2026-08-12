# Module 8 – Streams & Buffers ⭐⭐⭐⭐

## Topics

- Buffer
- Readable Stream
- Writable Stream
- Duplex Stream
- Transform Stream
- `pipe()`
- Backpressure
- File Streaming
- Large File Handling

---

# 1. Why Streams?

Streams allow Node.js to process data **incrementally in chunks** instead of loading the entire data into memory.

For a large file:

```text
5 GB File
   ↓
❌ Load entire file into RAM
```

With streams:

```text
5 GB File
   ↓
Chunk 1 → Process
Chunk 2 → Process
Chunk 3 → Process
...
```

Benefits:

- Lower memory usage
- Incremental processing
- Better scalability
- Can start processing before the entire file is available

Common use cases:

```text
Large files
HTTP requests/responses
Video/audio
Network communication
Compression
Encryption
CSV processing
Log processing
```

---

# 2. Buffer ⭐⭐⭐⭐⭐

A `Buffer` represents a sequence of **raw bytes**.

Node.js uses Buffers for:

```text
Files
Images
Videos
TCP sockets
HTTP data
Streams
Binary protocols
```

Example:

```js
const buffer = Buffer.from("Hello");

console.log(buffer);
console.log(buffer.toString());
```

Output:

```text
Hello
```

Mental model:

```text
"Hello"
   ↓
Bytes
   ↓
Buffer
```

---

# 3. Creating a Buffer

From a string:

```js
const buffer = Buffer.from("Hello");
```

From bytes:

```js
const buffer = Buffer.from([
  65,
  66,
  67
]);

console.log(buffer.toString());
```

Output:

```text
ABC
```

Because:

```text
65 → A
66 → B
67 → C
```

From hexadecimal:

```js
const buffer = Buffer.from(
  "48656c6c6f",
  "hex"
);

console.log(buffer.toString());
```

Output:

```text
Hello
```

---

# 4. Buffer Size

```js
const buffer = Buffer.from("Hello");

console.log(buffer.length);
```

`length` represents the number of bytes.

Important:

> Number of bytes and number of characters can differ when using multibyte encodings such as UTF-8.

---

# 5. Buffer vs String ⭐⭐⭐⭐⭐

| String | Buffer |
|---|---|
| Represents text | Represents raw bytes |
| Character-oriented | Byte-oriented |
| Used mainly for text | Used for binary data |
| Encoding converts text ↔ bytes | Stores byte data |

Example:

```text
Image
 ↓
Binary bytes
 ↓
Buffer
```

---

# 6. What is a Stream? ⭐⭐⭐⭐⭐

A stream is an abstraction for processing or transferring data **incrementally over time**.

Instead of:

```text
Entire data
    ↓
Memory
    ↓
Process
```

we use:

```text
Chunk
 ↓
Process
 ↓
Chunk
 ↓
Process
```

Streams are useful for:

```text
Large files
HTTP requests/responses
Network communication
Compression
Encryption
Media processing
```

---

# 7. Four Types of Streams ⭐⭐⭐⭐⭐

Node.js has four major stream types:

```text
Readable
Writable
Duplex
Transform
```

---

# 8. Readable Stream ⭐⭐⭐⭐⭐

A Readable stream is a source from which data can be read.

Examples:

```text
File read stream
HTTP request
TCP socket
```

Example:

```js
const fs = require("fs");

const stream =
  fs.createReadStream("large.txt");

stream.on("data", (chunk) => {
  console.log(chunk);
});
```

Flow:

```text
File
 ↓
Readable Stream
 ↓
Chunk
 ↓
Chunk
 ↓
Chunk
 ↓
end
```

---

# 9. Readable Stream Events

Common events:

```text
data
end
error
close
```

Example:

```js
const fs = require("fs");

const stream =
  fs.createReadStream("large.txt");

stream.on("data", (chunk) => {
  console.log("Received chunk");
});

stream.on("end", () => {
  console.log("Finished reading");
});

stream.on("error", (error) => {
  console.log("Error:", error);
});
```

---

# 10. `highWaterMark`

Streams use internal buffering.

`highWaterMark` specifies a threshold for how much data the stream tries to buffer before flow-control behavior kicks in.

Example:

```js
const fs = require("fs");

const stream = fs.createReadStream(
  "large.txt",
  {
    highWaterMark: 64 * 1024
  }
);
```

Here:

```text
64 * 1024 = 64 KB
```

Important:

> `highWaterMark` is a buffering threshold, not a strict guarantee that every emitted chunk will always have exactly that size.

---

# 11. Writable Stream ⭐⭐⭐⭐⭐

A Writable stream is a destination to which data can be written.

```js
const fs = require("fs");

const stream =
  fs.createWriteStream("output.txt");

stream.write("Hello\n");
stream.write("Node.js\n");

stream.end();
```

Flow:

```text
Application
     ↓
Writable Stream
     ↓
File
```

---

# 12. Writable Stream Events

Common events:

```text
drain
finish
error
close
```

Example:

```js
stream.on("finish", () => {
  console.log("Writing finished");
});
```

`finish` occurs after `end()` has been called and all data has been flushed/processed by the writable stream.

---

# 13. `write()` Return Value ⭐⭐⭐⭐⭐

This is important for backpressure.

```js
const canContinue =
  stream.write(data);
```

`write()` returns:

```text
true
```

if more data can be written without exceeding the stream's buffering threshold.

It can return:

```text
false
```

when the internal buffer needs to drain.

Then wait for:

```js
stream.on("drain", () => {
  // continue writing
});
```

---

# 14. Duplex Stream ⭐⭐⭐⭐⭐

A Duplex stream is both:

```text
Readable
+
Writable
```

Conceptually:

```text
       ┌──────────────┐
Data → │    Duplex    │ → Data
       └──────────────┘
```

Example:

```text
TCP socket
```

A TCP socket can:

```text
Receive data
+
Send data
```

---

# 15. Transform Stream ⭐⭐⭐⭐⭐

A Transform stream is a special Duplex stream where the output is derived from the input.

```text
Input
  ↓
Transform
  ↓
Output
```

Examples:

```text
Compression
Decompression
Encryption
Decryption
Data transformation
```

Example:

```js
const zlib = require("zlib");

const gzip = zlib.createGzip();
```

---

# 16. Creating a Transform Stream

```js
const { Transform } = require("stream");

const upperCaseStream = new Transform({
  transform(chunk, encoding, callback) {
    const result =
      chunk.toString().toUpperCase();

    callback(null, result);
  }
});
```

Use:

```js
process.stdin
  .pipe(upperCaseStream)
  .pipe(process.stdout);
```

Input:

```text
hello node
```

Output:

```text
HELLO NODE
```

---

# 17. Stream Type Comparison

| Type | Purpose |
|---|---|
| Readable | Read data |
| Writable | Write data |
| Duplex | Read + write |
| Transform | Read + transform + write |

Mental model:

```text
Readable
   ↓
Data source

Writable
   ↓
Data destination

Duplex
   ↓
Source + destination

Transform
   ↓
Source + transformation + destination
```

---

# 18. `pipe()` ⭐⭐⭐⭐⭐

`pipe()` connects a Readable stream to a Writable stream.

```js
readable.pipe(writable);
```

Example:

```js
const fs = require("fs");

const readStream =
  fs.createReadStream("input.txt");

const writeStream =
  fs.createWriteStream("output.txt");

readStream.pipe(writeStream);
```

Flow:

```text
input.txt
   ↓
Readable Stream
   ↓
pipe()
   ↓
Writable Stream
   ↓
output.txt
```

---

# 19. Why `pipe()` is Useful

Without `pipe()`:

```js
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});
```

You need to manage flow control yourself.

With:

```js
readStream.pipe(writeStream);
```

Node's stream mechanism manages the flow between the source and destination, including backpressure handling.

---

# 20. File Streaming ⭐⭐⭐⭐⭐

Suppose:

```text
video.mp4 = 5 GB
```

Avoid:

```js
const data =
  fs.readFileSync("video.mp4");

res.end(data);
```

Potential issue:

```text
5 GB
 ↓
RAM
 ↓
Huge memory pressure
```

Prefer:

```js
const stream =
  fs.createReadStream("video.mp4");

stream.pipe(res);
```

Flow:

```text
5 GB File
    ↓
Readable Stream
    ↓
Small chunks
    ↓
HTTP Response
    ↓
Client
```

---

# 21. HTTP File Streaming

Example:

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const stream =
    fs.createReadStream("video.mp4");

  res.writeHead(200, {
    "Content-Type": "video/mp4"
  });

  stream.pipe(res);
});

server.listen(3000);
```

The entire video is not loaded into memory before sending it to the client.

---

# 22. Large File Handling ⭐⭐⭐⭐⭐

Suppose:

```text
2 GB CSV
```

Avoid:

```js
const data =
  fs.readFileSync("large.csv");
```

Instead:

```js
const stream =
  fs.createReadStream("large.csv");

stream.on("data", (chunk) => {
  // process chunk
});
```

Benefits:

```text
Lower memory usage
Better scalability
Incremental processing
Can begin processing before the entire file is read
```

---

# 23. Processing a Large File

```js
const fs = require("fs");

const stream =
  fs.createReadStream("large.txt", {
    encoding: "utf8"
  });

stream.on("data", (chunk) => {
  console.log("Processing chunk...");
});

stream.on("end", () => {
  console.log("Finished");
});
```

The application processes chunks instead of loading the complete file.

---

# 24. Stream + Transform + File

Suppose you want to convert a large text file to uppercase.

Architecture:

```text
Input File
    ↓
Readable
    ↓
Transform
    ↓
Writable
    ↓
Output File
```

Code:

```js
const fs = require("fs");
const { Transform } = require("stream");

const upperCase =
  new Transform({
    transform(chunk, encoding, callback) {
      callback(
        null,
        chunk.toString().toUpperCase()
      );
    }
  });

fs.createReadStream("input.txt")
  .pipe(upperCase)
  .pipe(
    fs.createWriteStream("output.txt")
  );
```

This processes the file incrementally.

---

# 25. Backpressure ⭐⭐⭐⭐⭐

Backpressure occurs when:

```text
Producer is faster
        ↓
Consumer is slower
```

Example:

```text
Fast Readable
      ↓
Slow Writable
```

Without flow control:

```text
Data keeps accumulating
       ↓
Memory increases
       ↓
Possible memory problem
```

Backpressure tells the producer:

> Slow down because the consumer cannot process data fast enough.

---

# 26. Backpressure with `write()`

```js
const canContinue =
  writable.write(chunk);
```

If:

```js
canContinue === false
```

the producer should temporarily stop writing.

Wait for:

```js
writable.on("drain", () => {
  // Continue writing
});
```

Flow:

```text
write()
  ↓
false
  ↓
Pause producer
  ↓
Writable drains buffer
  ↓
drain
  ↓
Resume producer
```

---

# 27. Backpressure with `pipe()`

This is one reason `pipe()` is useful.

```js
readable.pipe(writable);
```

Conceptually:

```text
Readable
   ↓
Produces chunks
   ↓
Writable
   ↓
Buffer becomes full
   ↓
Reading slows/pauses
   ↓
Writable drains
   ↓
Reading resumes
```

---

# 28. Why Backpressure Matters

Without backpressure:

```text
Fast producer
     ↓
Huge buffer
     ↓
Memory usage increases
     ↓
Possible process crash
```

With backpressure:

```text
Fast producer
     ↓
Flow controlled
     ↓
Slow consumer
     ↓
Stable memory usage
```

---

# 29. Stream Error Handling ⭐⭐⭐⭐⭐

Always consider stream errors.

```js
const readStream =
  fs.createReadStream("file.txt");

readStream.on("error", (error) => {
  console.error(error);
});
```

For stream pipelines, prefer `pipeline()` for robust error propagation and cleanup.

---

# 30. `stream.pipeline()` ⭐⭐⭐⭐⭐

`pipeline()` connects streams while handling completion, errors, and cleanup more robustly.

```js
const fs = require("fs");
const { pipeline } = require("stream");

pipeline(
  fs.createReadStream("input.txt"),
  fs.createWriteStream("output.txt"),
  (error) => {
    if (error) {
      console.error(
        "Pipeline failed:",
        error
      );
      return;
    }

    console.log("Pipeline completed");
  }
);
```

---

# 31. Promise-based `pipeline()`

Node.js also provides a Promise-based version.

```js
const fs = require("fs");
const { pipeline } = require("stream/promises");

async function copyFile() {
  await pipeline(
    fs.createReadStream("input.txt"),
    fs.createWriteStream("output.txt")
  );
}

copyFile().catch(console.error);
```

This works naturally with `async/await`.

---

# 32. `pipe()` vs `pipeline()` ⭐⭐⭐⭐⭐

| `pipe()` | `pipeline()` |
|---|---|
| Connects streams | Connects streams |
| Simple and convenient | Better lifecycle/error handling |
| Good for straightforward flows | Preferred for robust production pipelines |
| Error handling may need extra care | Provides more comprehensive error/cleanup handling |

Interview answer:

> `pipe()` connects streams, while `pipeline()` is generally preferred when you need robust error propagation and cleanup across a stream chain.

---

# 33. Streaming vs Loading Entire File ⭐⭐⭐⭐⭐

### `readFile()`

```js
const data =
  await fs.promises.readFile("large.txt");
```

Mental model:

```text
Entire file
    ↓
Memory
```

### `createReadStream()`

```js
const stream =
  fs.createReadStream("large.txt");
```

Mental model:

```text
File
 ↓
Chunk
 ↓
Process
 ↓
Next chunk
```

Use streaming when the data can be large enough that loading it entirely into memory is undesirable.

---

# 34. Important: Streams Still Use Buffers

Streams typically use internal buffers.

```text
File
 ↓
Readable Stream
 ↓
Internal Buffer
 ↓
Chunk
 ↓
Application
```

Therefore:

```text
Buffer ≠ Stream
```

A Buffer is data in memory.

A Stream is an abstraction for moving or processing data over time.

---

# 35. Buffer vs Stream ⭐⭐⭐⭐⭐

| Buffer | Stream |
|---|---|
| Stores bytes | Processes/transfers data incrementally |
| Data is in memory | Data flows over time |
| Good for small binary data/chunks | Good for large or continuous data |
| Represents bytes | Represents a data source/destination/flow |
| Used by streams internally | Can emit/consume Buffers |

Simple analogy:

```text
Buffer = bucket of water

Stream = pipe carrying water
```

---

# 36. Large File Upload

Suppose a client uploads:

```text
2 GB video
```

Avoid accumulating the whole upload in memory.

Conceptually:

```text
Client
  ↓
HTTP Request
  ↓
Readable Stream
  ↓
Process chunks
  ↓
Storage
```

Example:

```js
req.pipe(
  fs.createWriteStream("upload.mp4")
);
```

In production, also consider:

```text
Authentication
Authorization
File-size limits
Content validation
Safe filenames/paths
Error handling
Cleanup
```

---

# 37. Large File Download

Instead of:

```js
const file =
  await fs.promises.readFile("video.mp4");

res.end(file);
```

use:

```js
const stream =
  fs.createReadStream("video.mp4");

stream.pipe(res);
```

Flow:

```text
Disk
 ↓
Readable Stream
 ↓
HTTP Response
 ↓
Client
```

---

# 38. Why Streaming Improves Scalability ⭐⭐⭐⭐⭐

Suppose 100 users request a 1 GB file.

Without streaming:

```text
100 × 1 GB
     ↓
Potentially enormous memory pressure
```

With streaming:

```text
100 streams
     ↓
Small buffers/chunks
     ↓
Much lower memory requirement
```

The exact resource usage depends on buffering, network speed, concurrency, and application design.

---

# 39. Stream Modes

Readable streams commonly have two modes:

```text
Flowing mode
Paused mode
```

### Flowing mode

Data is automatically delivered through events such as:

```js
stream.on("data", handler);
```

### Paused mode

You explicitly request data:

```js
const chunk = stream.read();
```

Modern code can also use:

```js
for await (const chunk of stream) {
  // process chunk
}
```

---

# 40. Async Iteration with Streams ⭐⭐⭐⭐

Example:

```js
const fs = require("fs");

async function readFile() {
  const stream =
    fs.createReadStream("large.txt");

  for await (const chunk of stream) {
    console.log("Chunk:", chunk);
  }
}

readFile();
```

This is a convenient way to consume a readable stream with asynchronous iteration.

---

# 41. Interview Scenario – 10 GB File

Question:

> How would you send a 10 GB file to a client without consuming 10 GB of RAM?

Answer:

```text
Use a readable file stream
        ↓
fs.createReadStream()
        ↓
Pipe to HTTP response
        ↓
Client receives chunks
```

Example:

```js
const stream =
  fs.createReadStream("large-file.zip");

stream.pipe(res);
```

For production, handle errors and appropriate HTTP headers.

---

# 42. Interview Scenario – Large File Copy

Question:

> How would you copy a 20 GB file efficiently?

Answer:

```js
const { pipeline } = require("stream/promises");

await pipeline(
  fs.createReadStream("source.iso"),
  fs.createWriteStream("destination.iso")
);
```

This avoids loading the entire file into memory.

---

# 43. Interview Scenario – Transform Large File

Question:

> How would you transform a 5 GB file without loading it completely?

Answer:

```text
Readable
   ↓
Transform
   ↓
Writable
```

Example:

```js
fs.createReadStream("input.txt")
  .pipe(transformStream)
  .pipe(fs.createWriteStream("output.txt"));
```

---

# 44. Streams and Performance

Streams can improve:

```text
Memory efficiency
Scalability
Time-to-first-byte
Incremental processing
Large file handling
```

But streams do not automatically make every operation faster.

For CPU-heavy transformations, you may still need:

```text
Worker threads
Separate workers
Optimized algorithms
```

Streams solve **data flow**, not every performance problem.

---

# 45. Real-World Use Cases ⭐⭐⭐⭐⭐

Streams are commonly used for:

```text
Large file downloads
Large file uploads
Video/audio streaming
HTTP request/response bodies
Compression
Decompression
Encryption/decryption
CSV processing
Log processing
Database/export pipelines
Network sockets
```

---

# 46. Complete File Copy Example ⭐⭐⭐⭐⭐

```js
const fs = require("fs");
const { pipeline } = require("stream/promises");

async function copyLargeFile() {
  try {
    await pipeline(
      fs.createReadStream("large-input.zip"),
      fs.createWriteStream("large-output.zip")
    );

    console.log("Copy completed");
  } catch (error) {
    console.error("Copy failed:", error);
  }
}

copyLargeFile();
```

Advantages:

```text
Does not load entire file into memory
Processes incrementally
Handles backpressure
Provides better error/cleanup behavior
```

---

# 47. Complete HTTP File Streaming Example

```js
const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream");

const server = http.createServer((req, res) => {
  if (req.url === "/video") {
    res.writeHead(200, {
      "Content-Type": "video/mp4"
    });

    pipeline(
      fs.createReadStream("video.mp4"),
      res,
      (error) => {
        if (error) {
          console.error(
            "Streaming failed:",
            error
          );

          if (!res.headersSent) {
            res.statusCode = 500;
            res.end("Streaming failed");
          } else {
            res.destroy(error);
          }
        }
      }
    );

    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(3000);
```

Conceptually:

```text
Client
  ↓
HTTP Request
  ↓
Node.js
  ↓
createReadStream()
  ↓
Readable
  ↓
pipeline()
  ↓
HTTP Response
  ↓
Client
```

---

# 48. Common Mistakes ⭐⭐⭐⭐⭐

### Mistake 1 – Reading huge files completely

```js
const data =
  fs.readFileSync("huge-file.zip");
```

Prefer:

```js
fs.createReadStream("huge-file.zip");
```

### Mistake 2 – Ignoring backpressure

Manually writing huge amounts of data without respecting the `write()` return value can cause excessive buffering.

### Mistake 3 – Not handling stream errors

Consider:

```js
stream.on("error", handler);
```

or use:

```js
pipeline(...)
```

### Mistake 4 – Confusing Buffer and Stream

```text
Buffer → bytes/data in memory

Stream → mechanism for moving/processing data incrementally
```

### Mistake 5 – Using streams for everything

For small data, `readFile()` can be simpler.

Use streams when incremental processing or memory efficiency matters.

---

# 49. Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is a stream?

> A stream is an abstraction for processing or transferring data incrementally rather than loading the entire data set into memory.

### Q2. What are the four types of streams?

```text
Readable
Writable
Duplex
Transform
```

### Q3. What is a Buffer?

> A Buffer is a Node.js representation of raw bytes used for binary data.

### Q4. Difference between Buffer and Stream?

> A Buffer represents bytes held in memory, while a Stream represents a mechanism for reading, writing, or transforming data incrementally over time.

### Q5. What is `pipe()`?

> `pipe()` connects a Readable stream to a Writable stream and manages the flow of data between them.

### Q6. What is backpressure?

> Backpressure occurs when a data producer is faster than its consumer. The stream system slows or pauses the producer so data does not accumulate uncontrollably.

### Q7. How do you handle a 10 GB file?

> Use streaming, such as `fs.createReadStream()`, instead of loading the entire file with `readFile()`.

### Q8. Why is streaming memory efficient?

> Because data is processed in chunks rather than requiring the entire data set to be loaded into memory.

### Q9. What is `pipeline()`?

> `pipeline()` connects streams while providing more robust error propagation and cleanup handling.

### Q10. Difference between `pipe()` and `pipeline()`?

> `pipe()` primarily connects streams, while `pipeline()` provides stronger lifecycle and error handling across the stream chain.

### Q11. What is `highWaterMark`?

> It is a buffering threshold used by streams to determine how much data they should buffer before flow-control behavior occurs.

### Q12. What happens when `write()` returns `false`?

> The writable stream is indicating that its internal buffer is full enough that the producer should wait for the `drain` event before continuing.

---

# 50. ⭐ Most Important Interview Points

Be able to explain these without looking at notes:

```text
⭐⭐⭐⭐⭐ Buffer
⭐⭐⭐⭐⭐ Readable Stream
⭐⭐⭐⭐⭐ Writable Stream
⭐⭐⭐⭐⭐ Duplex Stream
⭐⭐⭐⭐⭐ Transform Stream
⭐⭐⭐⭐⭐ pipe()
⭐⭐⭐⭐⭐ Backpressure
⭐⭐⭐⭐⭐ File Streaming
⭐⭐⭐⭐⭐ Large File Handling
⭐⭐⭐⭐⭐ pipeline()
```

Especially understand:

```text
Large File
    ↓
createReadStream()
    ↓
Readable
    ↓
Chunks
    ↓
pipe()
    ↓
Writable / HTTP Response
    ↓
Client / File
```

And:

```text
Producer too fast
       ↓
Backpressure
       ↓
Slow/Pause producer
       ↓
Consumer catches up
       ↓
Resume
```

---

# 51. Final Mental Model

```text
                         Streams
                            │
             ┌──────────────┼──────────────┐
             ↓              ↓              ↓
         Readable        Writable       Duplex
             │              │              │
             │              │          Read + Write
             │              │
             └───────┬──────┘
                     ↓
                   pipe()
                     │
                     ↓
                 Data Flow
                     │
                     ↓
               Backpressure
                     │
                     ↓
              Controlled Memory
```

Transform:

```text
Input
  ↓
Readable
  ↓
Transform
  ↓
Modified Data
  ↓
Writable
```

Large file:

```text
10 GB File
    ↓
createReadStream()
    ↓
Small Chunks
    ↓
Transform / Processing
    ↓
createWriteStream() / HTTP Response
```

---

# Module 8 Checklist

```text
✅ Buffer
  ✅ Raw bytes
  ✅ Buffer.from()
  ✅ String ↔ Buffer
  ✅ Binary data
  ✅ Buffer vs String

✅ Readable Stream
  ✅ createReadStream()
  ✅ data
  ✅ end
  ✅ error
  ✅ highWaterMark
  ✅ Flowing/Paused modes

✅ Writable Stream
  ✅ createWriteStream()
  ✅ write()
  ✅ end()
  ✅ finish
  ✅ drain
  ✅ error

✅ Duplex Stream
  ✅ Read + Write
  ✅ TCP socket example

✅ Transform Stream
  ✅ Transform data
  ✅ Compression
  ✅ Encryption
  ✅ Custom Transform

✅ Pipe
  ✅ readable.pipe(writable)
  ✅ Data flow
  ✅ Flow control

✅ Backpressure
  ✅ Producer vs consumer
  ✅ write() → false
  ✅ drain
  ✅ Controlled memory

✅ File Streaming
  ✅ Large file read
  ✅ Large file write
  ✅ HTTP file streaming

✅ Large File Handling
  ✅ Avoid readFile for huge files
  ✅ Chunk processing
  ✅ Upload streaming
  ✅ Download streaming
  ✅ Memory efficiency

✅ Production
  ✅ Error handling
  ✅ pipeline()
  ✅ stream/promises
```

# Quick Revision

```text
Buffer       → Raw bytes in memory

Stream       → Incremental data flow

Readable     → Produces data

Writable     → Consumes data

Duplex       → Reads + writes

Transform    → Reads + transforms + writes

pipe()       → Connects streams

pipeline()   → Connects streams with robust error/cleanup handling

Backpressure → Controls fast producer vs slow consumer

File Stream  → Process large files in chunks

Large File   → Prefer streams over loading everything into RAM
```
