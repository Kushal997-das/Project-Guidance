package rbt;

import java.awt.Color;

import rbt.Node;

public class Node {

	public Node baseNode;
	public Node leftChild;
	public Node rightChild;

	public int nodeData;
	public int nodeColor; // 0 -> Black, 1 -> Red

	public int getNodeData() {
		return nodeData;
	}

	public void setNodeData(int nodeData) {
		this.nodeData = nodeData;
	}

	public Node getBaseNode() {
		return baseNode;
	}

	public void setBaseNode(Node baseNode) {
		this.baseNode = baseNode;
	}

	public Node getLeftChild() {
		return leftChild;
	}

	public void setLeftChild(Node leftChild) {
		this.leftChild = leftChild;
	}

	public Node getRightChild() {
		return rightChild;
	}

	public void setRightChild(Node rightChild) {
		this.rightChild = rightChild;
	}

	public int getNodeColor() {
		return nodeColor;
	}

	public void setNodeColor(int nodeColor) {
		this.nodeColor = nodeColor;
	}

	public Color getColorCode() {
		if (isRedColor())
			return new Color(255, 0, 0);
		else
			return new Color(0, 0, 0);

	}

	public boolean isRedColor() {
		return getNodeColor() == 1;
	}

	@Override
	public String toString() {
		return "" + nodeData;
	}

}
