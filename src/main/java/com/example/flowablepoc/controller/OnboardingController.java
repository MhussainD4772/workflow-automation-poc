package com.example.flowablepoc.controller;

import com.example.flowablepoc.service.OnboardingService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.runtime.ProcessInstance;
import com.example.flowablepoc.dto.TaskSubmissionRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/onboarding")
public class OnboardingController {

    private final RuntimeService runtimeService;
    private final OnboardingService onboardingService;

    public OnboardingController(RuntimeService runtimeService, OnboardingService onboardingService) {
        this.runtimeService = runtimeService;
        this.onboardingService = onboardingService;
    }

    @PostMapping("/start")
    public String startProcess() {
        ProcessInstance processInstance =
                runtimeService.startProcessInstanceByKey("onboardingProcess");

        String currentTask = onboardingService.getCurrentTask(processInstance.getId());

        return "Process started with ID: " + processInstance.getId()
                + " | Current task: " + currentTask;
    }

    @GetMapping("/task/{processId}")
    public String getCurrentTask(@PathVariable String processId) {
        return onboardingService.getCurrentTask(processId);
    }

    @PostMapping("/next")
    public String completeCurrentTask(@RequestBody TaskSubmissionRequest request) {
        return onboardingService.completeTask(request.getProcessId(), request.getData());
    }
}