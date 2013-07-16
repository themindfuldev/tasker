package controllers;
import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.running;
import static play.test.Helpers.testServer;
import lib.Order;
import lib.OrderedRunner;
import models.Card;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ObjectNode;
import org.junit.Test;
import org.junit.runner.RunWith;

import play.libs.WS;
import play.libs.WS.Response;
import play.mvc.Http.Status;

/**
 * Tests the Cards controller.
 * 
 * @author Tiago Garcia
 * @see http://github.com/tiagorg
 */
@RunWith(OrderedRunner.class)
public class CardsTest {
	
	private static final short PORT = 3333;
	private static Long correctProjectId;
	private static Long wrongProjectId = -1L;
	
	private ObjectMapper objectMapper;
	
	public CardsTest() {
		objectMapper = new ObjectMapper();
	}

 	/**
 	 * Tests action create, failure scenario.
 	 */
 	@Test
 	@Order(order=1)
 	public void testCreateFailure() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 			public void run() {
 	      	ObjectNode objectNode = objectMapper.createObjectNode();

 	      	assertThat(
 	           WS.url("http://localhost:" + PORT + "/api/cards").post(objectNode).get().getStatus()
 	         ).isEqualTo(Status.BAD_REQUEST);
			}
 	  });
 	}

 	/**
 	 * Tests action create, successful scenario.
 	 */
 	@Test
 	@Order(order=2)
 	public void testCreateSuccess() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 			public void run() {
 	      	ObjectNode objectNode = objectMapper.createObjectNode();
				objectNode.put("type", Card.Type.PROJECT.ordinal());
 	      	objectNode.put("title", "test");
 	      	objectNode.put("description", "test project");
 	      	objectNode.put("assignee", "tester");
 	      	
 	      	Response response = WS.url("http://localhost:" + PORT + "/api/cards").post(objectNode).get();
 	         assertThat(response.getStatus()).isEqualTo(Status.OK);
 	         correctProjectId = response.asJson().get("id").asLong(); 	         
 			}
	  });
	}
 	
 	/**
 	 * Tests action Get, failure scenario.
 	 */
 	@Test
 	@Order(order=3)
 	public void testGetFailure() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 	      public void run() {
				assertThat(
 	           WS.url("http://localhost:" + PORT + "/api/cards/" + wrongProjectId).get().get().getStatus()
 	         ).isEqualTo(Status.NOT_FOUND);
			}
 		});
 	}

 	/**
 	 * Tests action Get, successful scenario.
 	 */
 	@Test
 	@Order(order=4)
 	public void testGetSuccess() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 	      public void run() {
				assertThat(
 	           WS.url("http://localhost:" + PORT + "/api/cards/" + correctProjectId).get().get().getStatus()
 	         ).isEqualTo(Status.OK);
			}
 		});
 	}

 	/**
 	 * Tests action Get All, successful scenario.
 	 */
 	@Test
 	@Order(order=5)
 	public void testGetAll() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 	      public void run() {
 	      	Response response = WS.url("http://localhost:" + PORT + "/api/cards").get().get();
 	      	
				assertThat(response.getStatus()).isEqualTo(Status.OK);
				assertThat(response.asJson().isArray()).isTrue();
			}
 		});
 	}

 	/**
 	 * Tests action update, failure by wrong id scenario.
 	 */
 	@Test
 	@Order(order=6)
 	public void testUpdateFailureByWrongId() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 			public void run() {
 	      	ObjectNode objectNode = objectMapper.createObjectNode();
 	         assertThat(
 	         	WS.url("http://localhost:" + PORT + "/api/cards/" + wrongProjectId).put(objectNode).get().getStatus()
 	         ).isEqualTo(Status.BAD_REQUEST);
 			}
 		});
 	}

 	/**
 	 * Tests action update, failure by empty card scenario.
 	 */
 	@Test
 	@Order(order=7)
 	public void testUpdateFailureByEmptyCard() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 			public void run() {
 	      	ObjectNode objectNode = objectMapper.createObjectNode();
 	         assertThat(
 	         	WS.url("http://localhost:" + PORT + "/api/cards/" + correctProjectId).put(objectNode).get().getStatus()
 	         ).isEqualTo(Status.BAD_REQUEST);
 			}
 		});
 	}

 	/**
 	 * Tests action update, no changes scenario.
 	 */
 	@Test
 	@Order(order=8)
	public void testUpdateNoChanges() {
		running(testServer(PORT, fakeApplication()), new Runnable() {
			public void run() {
	      	ObjectNode objectNode = objectMapper.createObjectNode();
				objectNode.put("status", Card.Status.BACKLOG.ordinal());	      	
				assertThat(
 	         	WS.url("http://localhost:" + PORT + "/api/cards/" + correctProjectId).put(objectNode).get().getStatus()
 	         ).isEqualTo(Status.NO_CONTENT);
			}
		});
	}

 	/**
 	 * Tests action update, successful scenario.
 	 */
 	@Test
 	@Order(order=9)
 	public void testUpdateSuccess() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 			public void run() {
 	      	ObjectNode objectNode = objectMapper.createObjectNode();
				objectNode.put("status", Card.Status.IN_PROGRESS.ordinal());
 	         assertThat(
 	         	WS.url("http://localhost:" + PORT + "/api/cards/" + correctProjectId).put(objectNode).get().getStatus()
 	         ).isEqualTo(Status.OK);
			}
 	  });
 	}

 	/**
 	 * Tests action delete, failure scenario.
 	 */
 	@Test
 	@Order(order=10)
 	public void testDeleteFailure() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 			public void run() {
				assertThat(
 	           WS.url("http://localhost:" + PORT + "/api/cards/" + wrongProjectId).delete().get().getStatus()
 	         ).isEqualTo(Status.BAD_REQUEST);
			}
 		});
 	}

 	/**
 	 * Tests action delete, successful scenario.
 	 */
 	@Test
 	@Order(order=11)
 	public void testDeleteSuccess() {
 		running(testServer(PORT, fakeApplication()), new Runnable() {
 			public void run() {
 				assertThat(
 					WS.url("http://localhost:" + PORT + "/api/cards/" + correctProjectId).delete().get().getStatus()
				).isEqualTo(Status.OK);
 			}
 		});
 	}

}
