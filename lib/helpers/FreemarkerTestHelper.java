package helpers;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.text.ParseException;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import freemarker.cache.FileTemplateLoader;

public class FreemarkerTestHelper {
  private Configuration configuration;
  private Template template;

  /**
   * @param templatePath
   * @throws TemplateNotFoundException
   * @throws MalformedTemplateNameException
   * @throws ParseException
   * @throws IOException
   */
  public FreemarkerTestHelper(String templatePath)
      throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException {
    configuration = new Configuration(Configuration.VERSION_2_3_30);
    configuration.setTagSyntax(Configuration.SQUARE_BRACKET_TAG_SYNTAX);

    FileTemplateLoader templateLoader = new FileTemplateLoader(new File(System.getProperty("user.dir")));
    configuration.setTemplateLoader(templateLoader);

    template = configuration.getTemplate(templatePath);
  }

  /**
   * @return
   */
  public Configuration getConfiguration() {
    return configuration;
  }

  /**
   * @return
   */
  public Template getTemplate() {
    return template;
  }

  /**
   * @param model
   * @return
   * @throws TemplateException
   * @throws IOException
   */
  public Element render(Map<String, Object> model) throws TemplateException, IOException {
    StringWriter stringWriter = new StringWriter();
    getTemplate().process(model, stringWriter);

    String generatedHtml = stringWriter.toString();

    Document doc = Jsoup.parse(generatedHtml);
    Element component = doc.body().firstElementChild();

    return component;
  }
}
