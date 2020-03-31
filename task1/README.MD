## Running faq


```
git clone {rep URL} or download zip github.com/{cross-check path name}
```

```
npm i
```

-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode

## Examples 

1. Success - input & output static file {encode}
```
node task1 -s 1 -a encode -i task1/input.txt -o task1/output.txt
```

2. Success - live(command line) read output file {encode}

```
node task1 -s 1 -a encode -i task1/input.txt
```

decode output(if the file has encoded text)
```
node task1 -s 1 -a decode -i task1/output.txt
```

3. Success - live(command line)  decode/encode {write and read}
```
node task1 -s 2 -a decode
```

4. required option -s
```
node task1
```

5. required option -a
```
node task1 -s 2
```

6. required input path folder
```
node task1 -s 2 -a decode -i input.txt
```

7. required output path folder
```
node task1 -s 2 -a decode -i input.txt -o output.txt
```

8. required correct action
```
node task1 -a decode123 -s 2
```

9. required input file 
```
node task1 -s 5  -o task1/output.txt -a decode
```

10. required correct action 
```
node task1 -a encode -s helloWorld -i task1/input.txt -o task1/output.txt
```

11.  required need input if there is an output

```
node task1 -a encode -s 7 -o task1/output.txt
```