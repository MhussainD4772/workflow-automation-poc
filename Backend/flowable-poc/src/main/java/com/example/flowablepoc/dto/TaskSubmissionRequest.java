package com.example.flowablepoc.dto;

import java.util.Map;

public class TaskSubmissionRequest {

    private String processId;
    private Map<String, Object> data;

    public String getProcessId() {
        return processId;
    }

    public void setProcessId(String processId) {
        this.processId = processId;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
