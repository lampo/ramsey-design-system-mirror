---
to: components/<%= h.inflection.camelize( name ) %>/test/<%= h.inflection.camelize( name ) %>Test.java
---

package <%= h.inflection.camelize( name ) %>.test;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateNotFoundException;
import helpers.FreemarkerTestHelper;

public class <%= h.inflection.camelize( name ) %>Test {
  private static FreemarkerTestHelper ftl;
  private Map<String, Object> params;

  @BeforeAll
  private static void setup()
      throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException {
    ftl = new FreemarkerTestHelper("components/<%= h.inflection.camelize( name ) %>/test/templates/<%= h.inflection.dasherize( name ) %>-test-template.ftl");
  }

  @BeforeEach
  private void populateParams() {
    params = new HashMap<String, Object>() {};
  }

  @AfterEach
  private void clearParams() {
    params.clear();
  }
}
