import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv("epa-sea-level.csv")

    # Create scatter plot
    fig, ax = plt.subplots(figsize=(10, 10))
    df.plot(x="Year", y="CSIRO Adjusted Sea Level", kind="scatter")

    # Create first line of best fit
    x1 = range(df["Year"].iloc[0], 2050, 1)
    slope, intercept, r_value, p_value, std_err = linregress(df["Year"], df["CSIRO Adjusted Sea Level"])
    plt.plot(x1, intercept + slope*x1, 'r', label='fitted line 1')
    # Create second line of best fit
    x_ = range(2000, df["Year"].iloc[-1]+1, 1)
    slope, intercept, r_value, p_value, std_err = linregress(x_, df[-len(x_):]["CSIRO Adjusted Sea Level"])
    x2 = range(2000, 2050, 1)
    plt.plot(x2, intercept + slope*x2, 'r', label='fitted line 2')
    # Add labels and title
    plt.title("Rise in Sea Level")
    plt.xlabel("Year")
    plt.ylabel("Sea Level (inches)")
    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()