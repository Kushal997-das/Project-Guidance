import java.awt.Color;
import java.awt.Dimension;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;

import javax.swing.JPanel;

import rbt.Node;
import rbt.RedBlackTree;

public class MainPanel extends JPanel {

	private RedBlackTree tree;
	private int NodeRadius = 20;
	private int lineDimension = 50;
	private Color nodeTextColor = new Color(230, 230, 230);

	public MainPanel(RedBlackTree tree) {
		this.tree = tree;
	}

	private void typeNodeText(Graphics2D g, String text, int x, int y) {
		FontMetrics fm = g.getFontMetrics();
		double t_width = fm.getStringBounds(text, g).getWidth();
		g.drawString(text, (int) (x - t_width / 2), (int) (y + fm.getMaxAscent() / 2));
	}

	private int getGapBetweenNodes() {
		int depth = tree.getDepth();
		int multiplier = 30;
		float exponent = (float) 1.4;

		if (depth > 6) {
			multiplier += depth * 3;
			exponent += .1;
		}

		return (int) Math.pow(depth, exponent) * multiplier;
	}

	private void attachTwoNodes(Graphics2D g, int x1, int y1, int x2, int y2) {
		double hypot = Math.hypot(lineDimension, x2 - x1);
		int x11 = (int) (x1 + NodeRadius * (x2 - x1) / hypot);
		int y11 = (int) (y1 - NodeRadius * lineDimension / hypot);
		int x21 = (int) (x2 - NodeRadius * (x2 - x1) / hypot);
		int y21 = (int) (y2 + NodeRadius * lineDimension / hypot);
		g.drawLine(x11, y11, x21, y21);
	}

	@Override
	protected void paintComponent(Graphics graphics) {

		super.paintComponent(graphics);

		if (tree.getRoot() != null) {
			Graphics2D graphics2d = (Graphics2D) graphics;
			graphics2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
			graphics2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
			paintingTree(graphics2d, (Node) tree.getRoot(), getWidth() / 2, 30, getGapBetweenNodes());
		}

	}

	private void paintingTree(Graphics2D g, Node root, int x, int y, int xOffset) {

		if (x < 0)
			setPreferredSize(new Dimension(2 * getWidth(), getHeight()));

		// Start drawing the new node
		drawNewNode(g, root, x, y);

		if (root.getLeftChild() != null) {
			attachTwoNodes(g, x - xOffset, y + lineDimension, x, y);
			paintingTree(g, (Node) root.getLeftChild(), x - xOffset, y + lineDimension, xOffset / 2);
		}

		if (root.getRightChild() != null) {
			attachTwoNodes(g, x + xOffset, y + lineDimension, x, y);
			paintingTree(g, (Node) root.getRightChild(), x + xOffset, y + lineDimension, xOffset / 2);
		}
	}

	private void drawNewNode(Graphics2D g, Node node, int x, int y) {
		if (node != null) {
			g.setColor(node.getColorCode());
			g.fillOval(x - NodeRadius, y - NodeRadius, 2 * NodeRadius, 2 * NodeRadius);
			g.setColor(nodeTextColor);
			String text = node.toString();
			typeNodeText(g, text, x, y);
			g.setColor(Color.GRAY);
		}

	}

}
