// vendor
import React from 'react';

// components
import VerticalSlider from './verticalSlider/verticalSlider';

// data
import slides from './data/slides.json';

const App = () => <VerticalSlider slides={slides} />;

export default App;
