const form = document.querySelector("#gcd-form");
const firstInput = document.querySelector("#first-number");
const secondInput = document.querySelector("#second-number");
const formMessage = document.querySelector("#form-message");
const randomizeButton = document.querySelector("#randomize-btn");
const modal = document.querySelector("#result-modal");
const closeModalButton = document.querySelector("#close-modal");
const modalSummary = document.querySelector("#modal-summary");
const solutionSteps = document.querySelector("#solution-steps");

const samplePairs = [
  [84, 30],
  [252, 198],
  [144, 60],
  [1071, 462]
];

function buildEuclideanSteps(rawA, rawB) {
  let a = Math.abs(rawA);
  let b = Math.abs(rawB);

  if (a === 0 && b === 0) {
    return null;
  }

  if (a < b) {
    [a, b] = [b, a];
  }

  const steps = [];

  if (b === 0) {
    steps.push({
      title: "Immediate Result",
      text: `${a} is the greatest common factor because the second number is 0.`
    });
    return { gcd: a, orderedPair: [Math.abs(rawA), Math.abs(rawB)], steps };
  }

  while (b !== 0) {
    const quotient = Math.floor(a / b);
    const remainder = a % b;

    steps.push({
      title: `Step ${steps.length + 1}`,
      text: `${a} = ${b} × ${quotient} + ${remainder}`
    });

    a = b;
    b = remainder;
  }

  steps.push({
    title: "Final Step",
    text: `The remainder is now 0, so the GCF is ${a}.`
  });

  return { gcd: a, orderedPair: [Math.abs(rawA), Math.abs(rawB)], steps };
}

function openModal(result) {
  modalSummary.textContent = `For ${result.orderedPair[0]} and ${result.orderedPair[1]}, the greatest common factor is ${result.gcd}.`;
  solutionSteps.innerHTML = result.steps
    .map(
      (step) => `
        <article class="solution-step">
          <strong>${step.title}</strong>
          <span>${step.text}</span>
        </article>
      `
    )
    .join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstValue = Number(firstInput.value);
  const secondValue = Number(secondInput.value);

  if (!Number.isInteger(firstValue) || !Number.isInteger(secondValue)) {
    formMessage.textContent = "Please enter two whole numbers so the Euclidean algorithm can run cleanly.";
    return;
  }

  if (firstValue === 0 && secondValue === 0) {
    formMessage.textContent = "At least one number must be non-zero.";
    return;
  }

  const result = buildEuclideanSteps(firstValue, secondValue);
  formMessage.textContent = `Computed successfully. GCF(${firstValue}, ${secondValue}) = ${result.gcd}.`;
  openModal(result);
});

randomizeButton?.addEventListener("click", () => {
  const [first, second] = samplePairs[Math.floor(Math.random() * samplePairs.length)];
  firstInput.value = first;
  secondInput.value = second;
  formMessage.textContent = `Sample numbers loaded: ${first} and ${second}.`;
});

closeModalButton?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("open")) {
    closeModal();
  }
});
