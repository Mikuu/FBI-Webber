package demo.dishonest.bff.represent;

import demo.dishonest.bff.model.BaseEntity;

import java.util.List;

public class InnerData {
    private List<BaseEntity> left;
    private List<BaseEntity> right;

    public List<BaseEntity> getLeft() {
        return left;
    }

    public void setLeft(List<BaseEntity> left) {
        this.left = left;
    }

    public List<BaseEntity> getRight() {
        return right;
    }

    public void setRight(List<BaseEntity> right) {
        this.right = right;
    }
}
