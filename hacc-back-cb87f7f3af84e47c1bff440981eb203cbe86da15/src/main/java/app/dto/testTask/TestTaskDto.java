package app.dto.testTask;

import app.entity.TestTask;
import lombok.Data;

@Data
public class TestTaskDto {

    private String id;

    private String input;

    private String output;

    public static TestTaskDto toDto(TestTask entity) {
        TestTaskDto dto = new TestTaskDto();
        dto.setId(entity.getId());
        dto.setOutput(entity.getOutput());
        dto.setInput(entity.getInput());

        return dto;
    }

}
