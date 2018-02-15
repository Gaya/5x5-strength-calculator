/**
 * Calculate the best possible weight increase for your sets.
 *
 * @param max - Given the max you want to lift.
 * @param startRatio - The rate at which you want to start.
 * @param sets
 * @param smallestIncrement
 * @returns {number[]}
 */
function calcSetWeights(max = 0, startRatio = 0.8, sets = 5, smallestIncrement = 2.5) {
  const increments = sets - 1;
  const aimedWeightPerSet = (max - (max * startRatio)) / increments;
  const weightPerSet = Math.round(aimedWeightPerSet / smallestIncrement) * smallestIncrement;

  return new Array(sets).fill(0).map((i, index) => max - ((increments - index) * weightPerSet));
}

export default calcSetWeights;