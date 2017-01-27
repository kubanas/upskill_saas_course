class ContactsController < ApplicationController
  # Get request to /contact-us
  # Show new contact form 
  def new
    @contact = Contact.new
  end
  
  # Post-Request /contacts: 
  def create 
    # Mass assignment of form fields into Contact object:
    @contact = Contact.new(contact_params)
    # safe contact object to db: 
      if @contact.save
        # store form fields via parameters into variables:
        name = params[:contact][:name]
        email = params[:contact][:email]
        body = params[:contact][:comments]
        # Plug variable into Contact Mailer email method and sent:
        ContactMailer.contact_email(name, email, body).deliver
        # store succes msg in flash hash
        flash[:success] ="Message sent!"
        redirect_to new_contact_path
      else
        # if Contact object doesn't save,
        # store errors in flash hash
        # and redirect
        flash[:danger] = @contact.errors.full_messages.join(", ")
        redirect_to new_contact_path
      end
  end
  
  private
    # collect data from form USE strong paramaters,
    # whitelist the form fields
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
    
end