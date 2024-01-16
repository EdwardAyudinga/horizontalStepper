import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const palette = {
      active: '#5c3cb8ff',
      complete: '#5c3cb8ff',
      inactive: '#cfc5ecff',
      disabled: '#d1d0ceff',
      text: '#fff',
      shadow: 'rgba(0, 0, 0, 0.3)'
    };

    let stepsProvided;
    const DEFAULT_STEPS = 5; 

    const initializeStepper = () => {
      stepsProvided = document.querySelector('#stepper-container')?.getAttribute('data-no-of-steps');
      stepsProvided = stepsProvided ? Number(stepsProvided) : DEFAULT_STEPS;

      let template = `<div class="container-fluid"><div class="row"><div class="col-sm-12"><div class="stepper-container card"><div class="stepper">`;

      for (let index = 1; index <= stepsProvided; index++) {
        template += `<div class="step" data-index="${index}" onclick={() => handleClick(index)}><div class="step-circle"><span class="hide">${index}</span></div><div class="step-title"></div><div class="step-lines"></div><div class="step-subtitle"></div></div>`;
      }

      template += `</div></div></div></div></div>`;
      document.querySelector('#stepper-container').innerHTML = template;

      initializeStepperState();
    };

    const initializeStepperState = () => {
      const elements = document.querySelectorAll(".step");

      if (elements.length > 0) {
        elements.forEach((element, index) => {
          changeElementState(index + 1, 'active');
        });
      }
    };

    const handleClick = (index) => {
      console.log(`Se hizo clic en el elemento ${index}`);
    };

    const changeElementState = (index, state, stepName, customSubtitle) => {
      const element = document.querySelector(`[data-index="${index}"]`);

      if (!element) return;

      const circle = element.querySelector('.step-circle');
      const title = element.querySelector('.step-title');
      const lines = element.querySelector('.step-lines');
      const subtitleElement = element.querySelector('.step-subtitle');

      if (!circle || !title || !lines || !subtitleElement) return;

      element.classList.remove('active', 'complete', 'inactive', 'disabled');
      circle.style.backgroundColor = palette[state];
      title.style.color = lines.style.color = subtitleElement.style.color = palette.text;
      circle.querySelector(".hide").style.visibility = state === 'complete' ? 'hidden' : 'visible';
      element.classList.add(state);

      title.textContent = stepName || `Step ${index}`;
      subtitleElement.textContent = customSubtitle || `Default Subtitle`;
    };

    initializeStepper();
    /* Example of how to change the state of an element */
    changeElementState(2, 'complete', 'Second Step', 'This is the subtitle for the second step'); // Change the state manually
  }, []);

  return (
    <div>
      <div id="stepper-container" data-no-of-steps="5"></div>
    </div>
  );
};

export default App;
