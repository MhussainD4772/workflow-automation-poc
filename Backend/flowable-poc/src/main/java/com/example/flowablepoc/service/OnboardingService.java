package com.example.flowablepoc.service;

import org.flowable.engine.HistoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.history.HistoricProcessInstance;
import org.flowable.task.api.Task;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OnboardingService {

    /** End event id for Application Rejected in onboardingProcess.bpmn */
    private static final String END_EVENT_APPLICATION_REJECTED = "EndNoneEvent_33";

    private final TaskService taskService;
    private final RuntimeService runtimeService;
    private final HistoryService historyService;

    public OnboardingService(TaskService taskService, RuntimeService runtimeService, HistoryService historyService) {
        this.taskService = taskService;
        this.runtimeService = runtimeService;
        this.historyService = historyService;
    }

    public String getCurrentTask(String processId) {
        Task task = taskService.createTaskQuery()
                .processInstanceId(processId)
                .singleResult();

        if (task == null) {
            return "No active task";
        }

        return task.getName();
    }

    public String completeTask(String processId, Map<String, Object> data) {

        Task task = taskService.createTaskQuery()
                .processInstanceId(processId)
                .singleResult();

        if (task == null) {
            return "No active task";
        }

        taskService.complete(task.getId(), data);

        Task nextTask = taskService.createTaskQuery()
                .processInstanceId(processId)
                .singleResult();

        if (nextTask == null) {
            HistoricProcessInstance historic = historyService.createHistoricProcessInstanceQuery()
                    .processInstanceId(processId)
                    .singleResult();
            if (historic != null && END_EVENT_APPLICATION_REJECTED.equals(historic.getEndActivityId())) {
                return "Application Rejected";
            }
            return "Process completed";
        }

        return nextTask.getName();
    }
}