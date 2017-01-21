class Contact < ActiveRecord::Base
    #dont need to write out the values of a comment because rails checks
    #the data base :)
    #this is the blueprint! IDEAL CONTACT(WAS IST EIN RICHTIGER CONTACT? DAS HIER:)
    #Rules!:
    validates :name, presence: true
    validates :email, presence: true
    validates :comments, presence: true
end