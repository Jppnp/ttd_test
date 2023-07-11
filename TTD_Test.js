let input = {
  products: [
    {
      variants: ["souffle", "cake", "ice-cream"],
    },
    {
      variants: ["cherry", "choco"],
    },
    {
      variants: ["XL"],
    },
  ],
};

let output = [];
for (let i = 0; i < Object.keys(input.products[1].variants).length; i++) {
  for (let j = 0; j < Object.keys(input.products[0].variants).length; j++) {
    for (let k = 0; k < Object.keys(input.products[2].variants).length; k++) {
        output.push(`${input.products[0].variants[j]} ${input.products[1].variants[i]} ${input.products[2].variants[k]}`)
    }
  }
}

console.log(output)
