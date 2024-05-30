# Classification on Cmapps Dataset

We have performed classification only for the first set of training and testing data provided by the website.
- Column 1: Corresponds to engine number (This column is indexed 0 above because of Python's numbering convention)
- Column 2: Corresponds to cycle number. If engine 1 fails after 192 cycles, the entries of second column for engine 1 will go from 1 to 192. Similarly for other engines.
- Columns 3,4,5: 3 operational settings
- Columns 6-26: 21 sensor measurements

**Note : We preprocessed our dataset into csv file by giving names to the columns, calculated the EOL(End of life) of each engine and from that calculated LR ratio for every value in the dataset. After that finally assigned labels to the dataset. All this for formulation has been done in RUL_generating_data_cMapps.ipyn**

## Classification Problem Formulation
The challange of this competetion was to predict the Remaining Useful Life of the engine by using the given sensor's data and operational conditions.

But in this project, we ll try to simplify that by converting it to a Classification Problem. Where, the classes/labels will of 3 types, i.e. Good Condition, Moderate Condition and Warning Condition.

**Labels corresponding to each conditions**
- Good Condition - 0
- Moderate Condition - 1
- Warning Condition - 2
Defining the labels
Here we will define the engine's condition with Life Ratio (LR), which is the ratio between Current Cycle and the End cycle/ End of Life(EOL). If LR=0, that means the component has just started its degradation and LR=1 means, it is completely degraded.

1) if LR <= 0.6 - Good Condition
2) if 0.6 < LR <= 0.8 - Moderate Condition
3) if 0.8 < LR - Warning Condition
