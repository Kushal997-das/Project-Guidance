from sklearn.model_selection import train_test_split

import numpy as np
import tensorflow as tf

from pathlib import Path


if __name__ == '__main__':
    # Save paths
    dataset = str(Path(__file__).resolve().parent / 'Training_Data.csv')
    model_save = str(Path(__file__).resolve().parent / 'Model.h5')

    # Dataset
    x_dataset = np.loadtxt(dataset, delimiter=',', dtype='float32', usecols=list(range(1, (21 * 2) + 1)))
    y_dataset = np.loadtxt(dataset, delimiter=',', dtype='int32', usecols=(0))

    # Train and Test data
    x_train, x_test, y_train, y_test = train_test_split(x_dataset, y_dataset, train_size=0.75, random_state = 42)

    # Model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Input((21 * 2, )),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(50, activation='relu'),
        tf.keras.layers.Dropout(0.4),
        tf.keras.layers.Dense(25, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(10, activation='relu'),
        tf.keras.layers.Dense(4, activation='softmax')
    ])

    model.summary()

    # Callbacks
    cp_callback = tf.keras.callbacks.ModelCheckpoint(model_save, verbose=1, save_weights_only=False)
    es_callback = tf.keras.callbacks.EarlyStopping(patience=10, verbose=1)

    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    # Train model
    model.fit(
        x_train,
        y_train,
        epochs=100,
        batch_size=128,
        validation_data=(x_test, y_test),
        callbacks=[cp_callback, es_callback]
    )

    # Evaluate model
    val_loss, val_acc = model.evaluate(x_test, y_test, batch_size=128)

    # Saves the model
    model.save(model_save, include_optimizer=False)
