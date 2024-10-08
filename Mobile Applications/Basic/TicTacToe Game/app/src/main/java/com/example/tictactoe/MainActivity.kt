package com.example.tictactoe

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), View.OnClickListener {

    companion object {
        const val PLAYER_X = 1
        const val PLAYER_O = 0
        const val NO_PLAYER = -1
        const val BOARD_SIZE = 3
    }

    private var currentPlayer = PLAYER_X
    private var turnCount = 0
    private var boardStatus = Array(BOARD_SIZE) { IntArray(BOARD_SIZE) }
    private lateinit var boardButtons: Array<Array<Button>>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        boardButtons = arrayOf(
            arrayOf(button, button2, button3),
            arrayOf(button4, button5, button6),
            arrayOf(button7, button8, button9)
        )

        for (row in boardButtons) {
            for (button in row) {
                button.setOnClickListener(this)
            }
        }

        initializeBoardStatus()

        resetBtn.setOnClickListener {
            resetGame()
        }
    }

    private fun initializeBoardStatus() {
        for (i in 0 until BOARD_SIZE) {
            for (j in 0 until BOARD_SIZE) {
                boardStatus[i][j] = NO_PLAYER
                boardButtons[i][j].isEnabled = true
                boardButtons[i][j].text = ""
            }
        }
        updateDisplay("Player X's Turn")
    }

    private fun resetGame() {
        currentPlayer = PLAYER_X
        turnCount = 0
        initializeBoardStatus()
    }

    override fun onClick(view: View?) {
        when (view?.id) {
            R.id.button -> processMove(0, 0)
            R.id.button2 -> processMove(0, 1)
            R.id.button3 -> processMove(0, 2)
            R.id.button4 -> processMove(1, 0)
            R.id.button5 -> processMove(1, 1)
            R.id.button6 -> processMove(1, 2)
            R.id.button7 -> processMove(2, 0)
            R.id.button8 -> processMove(2, 1)
            R.id.button9 -> processMove(2, 2)
        }

        turnCount++
        currentPlayer = if (currentPlayer == PLAYER_X) PLAYER_O else PLAYER_X

        if (turnCount == BOARD_SIZE * BOARD_SIZE) {
            updateDisplay("Game Draw")
            disableBoard()
        } else {
            checkWinner()
        }
    }

    private fun processMove(row: Int, col: Int) {
        val value = if (currentPlayer == PLAYER_X) "X" else "O"
        boardButtons[row][col].apply {
            isEnabled = false
            text = value
        }
        boardStatus[row][col] = currentPlayer
        updateDisplay(if (currentPlayer == PLAYER_X) "Player O's Turn" else "Player X's Turn")
    }

    private fun checkWinner() {
        if (hasPlayerWon(PLAYER_X)) {
            updateDisplay("Player X Wins!")
            disableBoard()
        } else if (hasPlayerWon(PLAYER_O)) {
            updateDisplay("Player O Wins!")
            disableBoard()
        }
    }

    private fun hasPlayerWon(player: Int): Boolean {
        // Check rows and columns
        for (i in 0 until BOARD_SIZE) {
            if (isWinningLine(player, boardStatus[i][0], boardStatus[i][1], boardStatus[i][2]) ||
                isWinningLine(player, boardStatus[0][i], boardStatus[1][i], boardStatus[2][i])
            ) {
                return true
            }
        }

        // Check diagonals
        return (isWinningLine(player, boardStatus[0][0], boardStatus[1][1], boardStatus[2][2]) ||
                isWinningLine(player, boardStatus[0][2], boardStatus[1][1], boardStatus[2][0]))
    }

    private fun isWinningLine(player: Int, vararg positions: Int): Boolean {
        return positions.all { it == player }
    }

    private fun updateDisplay(message: String) {
        displayTv.text = message
    }

    private fun disableBoard() {
        for (row in boardButtons) {
            for (button in row) {
                button.isEnabled = false
            }
        }
    }
}
