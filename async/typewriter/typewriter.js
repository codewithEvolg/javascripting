const sentences = "hello there from lighthouse labs\n";

const typeWriter = (sentence) => {
  let delay = 0;
  for (const char of sentence) {
    setTimeout(() => {
      // print the char hereclear
      process.stdout.write(char);
    }, delay)
    delay += 1000; // <= 1s delay to make it noticeable. Can dial it down later.
  }
}

typeWriter(sentences);
