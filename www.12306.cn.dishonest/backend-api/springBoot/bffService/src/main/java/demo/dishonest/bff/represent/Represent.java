package demo.dishonest.bff.represent;

public class Represent {
    private InnerData data;
    private String errorMsg = "";
    private boolean status = true;

    public InnerData getData() {
        return data;
    }

    public void setData(InnerData data) {
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
