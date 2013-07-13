package models;
import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.running;

import java.util.List;

import lib.Order;
import lib.OrderedRunner;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Tests the Card model.
 * 
 * @author Tiago Garcia
 * @see http://github.com/tiagorg
 */
@RunWith(OrderedRunner.class)
public class CardTest {
	
	private static Long ID;
	
	/**
	 * Empties the database before the tests.
	 */
	@BeforeClass
	public static void init() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				List<Card> cardList = Card.all();
				for (Card card: cardList) {
					Card.delete(card.getId());
				}
			}
		});
	}
	
	/**
	 * Tests create method.
	 */
	@Test
	@Order(order=1)
	public void testCreateCard() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				Card card = new Card();
				card.setType(Card.Type.PROJECT);
				card.setTitle("test");
				card.setDescription("test project");
				card.setAssignee("tester");
				Card.create(card);
				
				ID = card.getId();
				assertThat(ID).isNotNull();
				assertThat(card.getCreatedDate()).isNotNull();
				assertThat(card.getModifiedDate()).isNotNull();
			}
		});
	}

	/**
	 * Tests all method.
	 */
	@Test
	@Order(order=2)
	public void testAll() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				List<Card> cardList = Card.all();
				assertThat(cardList.size()).isGreaterThan(0);
			}
		});
	}
	
	/**
	 * Tests update method.
	 */
	@Test
	@Order(order=3)
	public void testUpdateCard() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				Card card = Card.byId(ID);
				card.setStatus(Card.Status.IN_PROGRESS);
				Card.update(card);
				
				assertThat(card.getModifiedDate()).isNotEqualTo(card.getCreatedDate());
			}
		});
	}	
	
	/**
	 * Tests delete method.
	 */
	@Test
	@Order(order=4)
	public void testDeleteCard() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				Card.delete(ID);				
				Card card = Card.byId(ID);
				assertThat(card).isNull();
			}
		});
	}

}
