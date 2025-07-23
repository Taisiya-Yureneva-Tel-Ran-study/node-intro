import RandomNumberStream from "./RandomNumberStream.ts";

const rns = new RandomNumberStream();
rns.pipe(process.stdout);
rns.on("end", () => {
    // We need to use callback to be sure that all the data is written to the stdout before the process exits
    process.stdout.write("\nend emitted", () => console.log("\nNow it should end correctly. Bye!"));
});

