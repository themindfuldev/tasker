package controllers;

import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.contentType;

import org.junit.Test;

import play.mvc.Content;

/**
 * Tests the Application controller.
 * 
 * @author Tiago Garcia
 * @see http://github.com/tiagorg
 */
public class ApplicationTest {

	/**
	 * Tests the template renderization.
	 */
	@Test
	public void testTemplateRenderization() {
		Content html = views.html.index.render();
		assertThat(contentType(html)).isEqualTo("text/html");
		assertThat(html.body().contains("Tasker")).isTrue();
	}

}
