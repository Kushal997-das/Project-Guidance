package rbt;

import rbt.Node;

public class RedBlackTree {

	// Root node
	private Node root;
	// nill node of the tree node
	private Node nill;

	// Constructor of Red Black Tree
	public RedBlackTree() {
		nill = new Node();
		nill.nodeColor = 0;
		nill.leftChild = null;
		nill.rightChild = null;
		root = nill;
	}
	


	// Function to insert a new node to the red black tree
	public void insert(int key) {
		Node node = new Node();
		
		node.baseNode = null;
		node.leftChild = nill;
		node.rightChild = nill;
		
		node.nodeData = key;
		node.nodeColor = 1; // 1 For red

		Node y = null;
		Node x = this.root;

		while (x != nill) {
			y = x;
			if (node.nodeData < x.nodeData) {
				x = x.leftChild;
			} else {
				x = x.rightChild;
			}
		}

		node.baseNode = y;
		if (y == null) {
			root = node;
		} else if (node.nodeData < y.nodeData) {
			y.leftChild = node;
		} else {
			y.rightChild = node;
		}

		if (node.baseNode == null) {
			node.nodeColor = 0;
			return;
		}
		if (node.baseNode.baseNode == null) {
			return;
		}
		refixingInsertNode(node);
	}

	// Clear the node in GUI
	public void clear() {
		root = null;
		nill = new Node();
		nill.nodeColor = 0;
		nill.leftChild = null;
		nill.rightChild = null;
		root = nill;
	}

	// delete the node from the tree
	public void removeNode(int nodeData) {
		mainRemoveNode(this.root, nodeData);
	}

	// This function to fix the colors and places of rbt after delete one
	private void rearrangingNodes(Node x) {
		Node s;
		while (x != root && x.nodeColor == 0) {
			if (x == x.baseNode.leftChild) {
				s = x.baseNode.rightChild;
				if (s.nodeColor == 1) {
					s.nodeColor = 0;
					x.baseNode.nodeColor = 1;
					leftRotate(x.baseNode);
					s = x.baseNode.rightChild;
				}

				if (s.leftChild.nodeColor == 0 && s.rightChild.nodeColor == 0) {
					s.nodeColor = 1;
					x = x.baseNode;
				} else {
					if (s.rightChild.nodeColor == 0) {
						s.leftChild.nodeColor = 0;
						s.nodeColor = 1;
						rightRotate(s);
						s = x.baseNode.rightChild;
					}
					s.nodeColor = x.baseNode.nodeColor;
					x.baseNode.nodeColor = 0;
					s.rightChild.nodeColor = 0;
					leftRotate(x.baseNode);
					x = root;
				}
			} else {
				s = x.baseNode.leftChild;
				if (s.nodeColor == 1) {
					s.nodeColor = 0;
					x.baseNode.nodeColor = 1;
					rightRotate(x.baseNode);
					s = x.baseNode.leftChild;
				}

				if (s.rightChild.nodeColor == 0 && s.rightChild.nodeColor == 0) {
					s.nodeColor = 1;
					x = x.baseNode;
				} else {
					if (s.leftChild.nodeColor == 0) {
						s.rightChild.nodeColor = 0;
						s.nodeColor = 1;
						leftRotate(s);
						s = x.baseNode.leftChild;
					}
					s.nodeColor = x.baseNode.nodeColor;
					x.baseNode.nodeColor = 0;
					s.leftChild.nodeColor = 0;
					rightRotate(x.baseNode);
					x = root;
				}
			}
		}
		x.nodeColor = 0;
	}

	private void rbtTransform(Node u, Node v) {
		if (u.baseNode == null) {
			root = v;
		} else if (u == u.baseNode.leftChild) {
			u.baseNode.leftChild = v;
		} else {
			u.baseNode.rightChild = v;
		}
		v.baseNode = u.baseNode;
	}

	private void mainRemoveNode(Node node, int key) {
		// find the node containing node data
		Node c = nill;
		Node a, b;
		while (node != nill) {
			if (node.nodeData == key) {
				c = node;
			}

			if (node.nodeData <= key) {
				node = node.rightChild;
			} else {
				node = node.leftChild;
			}
		}

		if (c == nill) {
			System.out.println("Invalid node value");
			return;
		}

		b = c;
		int bNodeColor = b.nodeColor;
		if (c.leftChild == nill) {
			a = c.rightChild;
			rbtTransform(c, c.rightChild);
		} else if (c.rightChild == nill) {
			a = c.leftChild;
			rbtTransform(c, c.leftChild);
		} else {
			b = minimum(c.rightChild);
			bNodeColor = b.nodeColor;
			a = b.rightChild;
			if (b.baseNode == c) {
				a.baseNode = b;
			} else {
				rbtTransform(b, b.rightChild);
				b.rightChild = c.rightChild;
				b.rightChild.baseNode = b;
			}

			rbtTransform(c, b);
			b.leftChild = c.leftChild;
			b.leftChild.baseNode = b;
			b.nodeColor = c.nodeColor;
		}
		if (bNodeColor == 0) {
			rearrangingNodes(a);
		}
	}

	// Fix the red black tree after inserting new node
	private void refixingInsertNode(Node k) {
		Node f;
		while (k.baseNode.nodeColor == 1) {
			if (k.baseNode == k.baseNode.baseNode.rightChild) {
				f = k.baseNode.baseNode.leftChild;
				if (f.nodeColor == 1) {
					f.nodeColor = 0;
					k.baseNode.nodeColor = 0;
					k.baseNode.baseNode.nodeColor = 1;
					k = k.baseNode.baseNode;
				} else {
					if (k == k.baseNode.leftChild) {
						k = k.baseNode;
						rightRotate(k);
					}
					k.baseNode.nodeColor = 0;
					k.baseNode.baseNode.nodeColor = 1;
					leftRotate(k.baseNode.baseNode);
				}
			} else {
				f = k.baseNode.baseNode.rightChild;

				if (f.nodeColor == 1) {
					f.nodeColor = 0;
					k.baseNode.nodeColor = 0;
					k.baseNode.baseNode.nodeColor = 1;
					k = k.baseNode.baseNode;
				} else {
					if (k == k.baseNode.rightChild) {
						k = k.baseNode;
						leftRotate(k);
					}
					k.baseNode.nodeColor = 0;
					k.baseNode.baseNode.nodeColor = 1;
					rightRotate(k.baseNode.baseNode);
				}
			}
			if (k == root) {
				break;
			}
		}
		root.nodeColor = 0;
	}

	// find the node with the minimum nodeData
	public Node minimum(Node node) {
		while (node.leftChild != nill) {
			node = node.leftChild;
		}
		return node;
	}

	// rotate left of a node
	public void leftRotate(Node x) {
		Node l = x.rightChild;
		x.rightChild = l.leftChild;
		if (l.leftChild != nill) {
			l.leftChild.baseNode = x;
		}
		l.baseNode = x.baseNode;
		if (x.baseNode == null) {
			this.root = l;
		} else if (x == x.baseNode.leftChild) {
			x.baseNode.leftChild = l;
		} else {
			x.baseNode.rightChild = l;
		}
		l.leftChild = x;
		x.baseNode = l;
	}

	// rotate right of a node
	public void rightRotate(Node x) {
		Node r = x.leftChild;
		x.leftChild = r.rightChild;
		if (r.rightChild != nill) {
			r.rightChild.baseNode = x;
		}
		r.baseNode = x.baseNode;
		if (x.baseNode == null) {
			this.root = r;
		} else if (x == x.baseNode.rightChild) {
			x.baseNode.rightChild = r;
		} else {
			x.baseNode.leftChild = r;
		}
		r.rightChild = x;
		x.baseNode = r;
	}
	
	
	 public void printRBT(Node root, String indent, boolean last) {
		    if (root != null) {
		      System.out.print(indent);
		      if (last) {
		        System.out.print("R----");
		        indent += "   ";
		      } else {
		        System.out.print("L----");
		        indent += "|  ";
		      }

		      String sColor = root.nodeColor == 1 ? "RED" : "BLACK";
		      System.out.println(root.nodeData + "(" + sColor + ")");
		      printRBT(root.leftChild, indent, false);
		      printRBT(root.rightChild, indent, true);
		    }
	 }
	

	/*
	 * 
	 * The following functions help with GUI
	 * 
	 */
	public Node getRoot() {
		return this.root;
	}

	public int getDepth() {
		return this.getDepth(this.root);
	}

	private int getDepth(Node node) {
		if (node != null) {
			int rightChild_depth;
			
			int leftChild_depth = this.getDepth(node.getLeftChild());
			
			return leftChild_depth > (rightChild_depth = this.getDepth(node.getRightChild())) ? leftChild_depth + 1 : rightChild_depth + 1;
		}
		return 0;
	}

}
