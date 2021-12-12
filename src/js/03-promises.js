function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            resolve({ position, delay });
            }, delay);
        }); 
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            reject({ position, delay });
            }, delay);
        });
    }
}

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const formElement = e.currentTarget.elements;
  const delayEl = formElement.delay.valueAsNumber;
  const stepEl = formElement.step.valueAsNumber;
  const amountEl = formElement.amount.valueAsNumber;

  if (amountEl > 0) {
    for (let i = 0; i < amountEl; i += 1) {
      let newDelay = delayEl;
      newDelay = delayEl + stepEl * i;

      createPromise(i + 1, newDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
}
