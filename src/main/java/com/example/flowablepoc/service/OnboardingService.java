package com.example.flowablepoc.service;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.task.api.Task;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OnboardingService {

    private final TaskService taskService;
    private final RuntimeService runtimeService;

    public OnboardingService(TaskService taskService, RuntimeService runtimeService) {
        this.taskService = taskService;
        this.runtimeService = runtimeService;
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
            return "Process completed";
        }

        return nextTask.getName();
    }
}