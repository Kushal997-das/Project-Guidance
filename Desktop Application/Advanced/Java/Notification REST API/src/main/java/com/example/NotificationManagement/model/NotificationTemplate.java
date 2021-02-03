package com.example.NotificationManagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class NotificationTemplate {

    UUID id;
    String templateSubject, templateContent, templateLanguage, templateType;

    public NotificationTemplate(@JsonProperty("id") UUID id,
                                @JsonProperty("templateSubject") String templateSubject
            , @JsonProperty("templateContent") String templateContent
            , @JsonProperty("templateLanguage") String templateLanguage
            , @JsonProperty("templateType") String templateType) {
        this.id = id;
        this.templateSubject = templateSubject;
        this.templateContent = templateContent;
        this.templateLanguage = templateLanguage;
        this.templateType = templateType;
    }

    public NotificationTemplate() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTemplateSubject() {
        return templateSubject;
    }

    public void setTemplateSubject(String templateSubject) {
        this.templateSubject = templateSubject;
    }

    public String getTemplateContent() {
        return templateContent;
    }

    public void setTemplateContent(String templateContent) {
        this.templateContent = templateContent;
    }

    public String getTemplateLanguage() {
        return templateLanguage;
    }

    public void setTemplateLanguage(String templateLanguage) {
        this.templateLanguage = templateLanguage;
    }

    public String getTemplateType() {
        return templateType;
    }

    public void setTemplateType(String templateType) {
        this.templateType = templateType;
    }
}
