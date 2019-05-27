package demo.dishonest.bff.represent;

import demo.dishonest.bff.model.BaseEntity;

import java.util.List;

public class RepresentOne {
    private List<BaseEntity> data;
    private String errorMsg = "";
    private boolean status = true;

    public List<BaseEntity> getData() {
        return data;
    }

    public void setData(List<BaseEntity> data) {
        this.data = data;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
