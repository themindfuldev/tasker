package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;

import play.db.ebean.Model;

/**
 * This is the Card model, featuring persistence using Ebean
 * 
 * @author Tiago Garcia
 * @see http://github.com/tiagorg
 */
@SuppressWarnings("serial")
@Entity
public class Card extends Model {

	public enum Type {
		PROJECT, STORY, TASK, BUG, ENHANCEMENT
	}

	public enum Status {
		BACKLOG, IN_PROGRESS, VERIFY, SIGNED_OFF
	}

	@Id
	private Long id;

	@Basic(optional = false)
	private Type type;

	@Basic(optional = false)
	private Status status;

	@Basic(optional = false)
	private String title;

	@Basic(optional = false)
	private String description;

	@Basic(optional = false)
	private String assignee;

	@Basic(optional = false)
	private Date createdDate;

	@Basic(optional = false)
	private Date modifiedDate;

	private List<Card> children;

	/*
	 * Getters and setters
	 */
	public Long getId() {
		return id;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAssignee() {
		return assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public List<Card> getChildren() {
		return children;
	}

	public void setChildren(List<Card> children) {
		this.children = children;
	}

	/*
	 * Persistence
	 */
	private static Finder<Long, Card> find = new Finder<Long, Card>(Long.class,
			Card.class);

	/**
	 * Retrieves all the cards.
	 * 
	 * @return a list of cards
	 */
	public static List<Card> all() {
		return find.all();
	}

	/**
	 * Retrieves a particular card.
	 * 
	 * @param id
	 *           the card id
	 * @return the card
	 */
	public static Card byId(Long id) {
		return find.byId(id);
	}

	/**
	 * Persists a brand new card.
	 * 
	 * @param card
	 *           the card
	 */
	public static void create(Card card) {
		card.status = Status.BACKLOG;
		card.createdDate = card.modifiedDate = new Date();
		card.save();
	}

	/**
	 * Updates an existing card.
	 * 
	 * @param card
	 *           the card
	 */
	public static void update(Card card) {
		card.modifiedDate = new Date();
		card.save();
	}

	/**
	 * Deletes a card.
	 * 
	 * @param id
	 *           the card id
	 */
	public static void delete(Long id) {
		find.ref(id).delete();
	}

}
