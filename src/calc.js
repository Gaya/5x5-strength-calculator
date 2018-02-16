/**
 * Calculate the best possible weight increase for your sets.
 *
 * @param max - Given the max you want to lift.
 * @param startRatio - The rate at which you want to start.
 * @param sets
 * @param smallestIncrement
 * @returns {number[]}
 */
function calcWeightPerSet(max = 0, startRatio = 0.8, sets = 5, smallestIncrement = 2.5) {
  const increments = sets - 1;
  const aimedWeightPerSet = (max - (max * startRatio)) / increments;

  return Math.round(aimedWeightPerSet / smallestIncrement) * smallestIncrement;
}

export default calcWeightPerSet;