# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from sqlalchemy import or_



# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:sahana@localhost/bpa'
# db = SQLAlchemy(app)
# CORS(app)

# class Registration(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     registration_type = db.Column(db.String(50), nullable=False)
#     company_name = db.Column(db.String(100))
#     company_establishment_date = db.Column(db.String(20))
#     phone_number = db.Column(db.String(15))
#     email = db.Column(db.String(50))
#     branch_location = db.Column(db.String(100))
#     company_address = db.Column(db.String(100))
#     password = db.Column(db.String(50))

#     freelancer_name = db.Column(db.String(100))
#     freelancer_dob = db.Column(db.String(20))
#     freelancer_contact_number = db.Column(db.String(15))
#     freelancer_email = db.Column(db.String(50))
#     freelancer_password = db.Column(db.String(50))

#     customer_name = db.Column(db.String(100))
#     customer_contact_number = db.Column(db.String(15))
#     customer_email = db.Column(db.String(50))
#     customer_password = db.Column(db.String(50))

# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.json
#         registration_type = data.get('registrationType')

#         if registration_type == 'organization':
#             new_registration = Registration(
#                 registration_type='organization',
#                 company_name=data.get('companyName'),
#                 company_establishment_date=data.get('companyEstablishmentDate'),
#                 phone_number=data.get('phoneNumber'),
#                 branch_location=data.get('branchLocation'),# Include branch location here
#                 email=data.get('email'),
#                 company_address=data.get('companyAddress'),
#                 password=data.get('password'),
#             )
#         elif registration_type == 'freelancer':
#             new_registration = Registration(
#                 registration_type='freelancer',
#                 freelancer_name=data.get('freelancerName'),
#                 freelancer_dob=data.get('freelancerDOB'),
#                 freelancer_contact_number=data.get('freelancerContactNumber'),
#                 freelancer_email=data.get('freelancerEmail'),
#                 freelancer_password=data.get('password'),
#             )
#         else:
#             return jsonify({'message': 'Invalid registration type'}), 400

#         db.session.add(new_registration)
#         db.session.commit()

#         return jsonify({'message': 'Registration successful'})
#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Registration failed'}), 500


# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.json

#          # Retrieve user based on username or email
#         user = Registration.query.filter(
#             (Registration.company_name == data['username'] and Registration.registration_type == 'organization') |
#             (Registration.freelancer_name == data['username'] and Registration.registration_type == 'freelancer') |
#             (Registration.customer_name == data['username'] and Registration.registration_type == 'customer')
#         ).first()

#         if user:
#             print('Stored password:', user.password if user.registration_type != 'freelancer' else user.freelancer_password)
            
#             # Check the correct attribute based on registration type
#             stored_password = user.password if user.registration_type != 'freelancer' else user.freelancer_password
#             stored_password = stored_password if user.registration_type != 'customer' else user.customer_password

#             if stored_password and stored_password == data['password']:
#                 return jsonify({'message': 'Login successful'})
#             else:
#                 return jsonify({'message': 'Invalid password'}), 401
#         else:
#             return jsonify({'message': 'User not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Login failed. Please try again.'}), 500

# # Other routes and configurations...
# @app.route('/get-organization-details', methods=['GET'])
# def get_organization_details():
#     try:
#         organization_details = Registration.query.filter_by(registration_type='organization').first()
#         if organization_details:
#             return jsonify({
#                 'company_name': organization_details.company_name,
#                 'company_establishment_date': organization_details.company_establishment_date,
#                 'phone_number': organization_details.phone_number,
#                 'email': organization_details.email,
#                 'company_address': organization_details.company_address,
#                 'branch_location': organization_details.branch_location,  # Include branch location here
#             })
#         else:
#             return jsonify({'message': 'Organization details not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Error fetching organization details'}), 500


# @app.route('/get-freelancer-details', methods=['GET'])
# def get_freelancer_details():
#     try:
#         freelancer_details = Registration.query.filter_by(registration_type='freelancer').first()
#         if freelancer_details:
#             return jsonify({
#                 'freelancer_name': freelancer_details.freelancer_name,
#                 'freelancer_dob': freelancer_details.freelancer_dob,
#                 'freelancer_contact_number': freelancer_details.freelancer_contact_number,
#                 'freelancer_email': freelancer_details.freelancer_email,
#             })
#         else:
#             return jsonify({'message': 'Freelancer details not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Error fetching freelancer details'}), 500
    


# @app.route('/get-customer-details', methods=['GET'])
# def get_customer_details():
#     try:
#         customer_details = Registration.query.filter_by(registration_type='customer').first()
#         if customer_details:
#             return jsonify({
#                 'customer_name': customer_details.customer_name,
#                 'customer_contact_number': customer_details.customer_contact_number,
#                 'customer_email': customer_details.customer_email,
#             })
#         else:
#             return jsonify({'message': 'Customer details not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Error fetching customer details'}), 500
    
    
# @app.route('/get-company-names', methods=['GET'])
# def get_company_names():
#     try:
#         # Retrieve distinct company names directly from the database
#         company_names = Registration.query.filter_by(registration_type='organization') \
#                           .distinct(Registration.company_name) \
#                           .with_entities(Registration.company_name) \
#                           .all()

#         unique_company_names = list(set([name[0] for name in company_names]))
#         print('Unique Company Names:', unique_company_names)  # Add this line for debugging

#         return jsonify({'companyNames': unique_company_names})
#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Error fetching company names'}), 500


    

# @app.route('/get-details-by-company', methods=['POST'])
# def get_details_by_company():
#     try:
#         data = request.json
#         company = data.get('company')
#         org_type = data.get('type')
#         branch = data.get('branch')

#         # Fetch details based on company, organization type, and branch location
#         details = Registration.query.filter_by(company_name=company, registration_type=org_type, branch_location=branch).all()

#         if details:
#             # Construct a list of details for all locations
#             details_list = []
#             for entry in details:
#                 details_list.append({
#                     'company_name': entry.company_name,
#                     'company_establishment_date': entry.company_establishment_date,
#                     'phone_number': entry.phone_number,
#                     'email': entry.email,
#                     'company_address': entry.company_address,
#                     'branch_location': entry.branch_location,
#                     # Add other details as needed
#                 })

#             # Return the list of details as a JSON response
#             return jsonify({'details': details_list})
#         else:
#             return jsonify({'message': 'Details not found'}), 404
#     except Exception as e:
#         print('Error in get_details_by_company:', e)
#         return jsonify({'message': 'Internal Server Error'}), 500

# @app.route('/get-branch-locations', methods=['GET'])
# def get_branch_locations():
#     try:
#         company = request.args.get('company')

#         # Fetch branch locations based on the selected company
#         locations = Registration.query.filter_by(company_name=company, registration_type='organization').with_entities(Registration.branch_location).distinct()

#         if locations:
#             # Convert the result to a list of branch locations
#             branch_locations = [loc[0] for loc in locations]
#             return jsonify({'branchLocations': branch_locations})
#         else:
#             return jsonify({'message': 'Branch locations not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Error fetching branch locations'}), 500

    
# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)



from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import or_

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:sahana@localhost/bpa'
db = SQLAlchemy(app)
CORS(app)

class Registration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    registration_type = db.Column(db.String(50), nullable=False)
    company_name = db.Column(db.String(100))
    company_establishment_date = db.Column(db.String(20))
    phone_number = db.Column(db.String(15))
    email = db.Column(db.String(50))
    branch_location = db.Column(db.String(100))
    company_address = db.Column(db.String(100))
    password = db.Column(db.String(50))

    freelancer_name = db.Column(db.String(100))
    freelancer_dob = db.Column(db.String(20))
    freelancer_contact_number = db.Column(db.String(15))
    freelancer_email = db.Column(db.String(50))
    freelancer_password = db.Column(db.String(50))

    customer_name = db.Column(db.String(100))
    customer_contact_number = db.Column(db.String(15))
    customer_email = db.Column(db.String(50))
    customer_password = db.Column(db.String(50))

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        registration_type = data.get('registrationType')

        if registration_type == 'organization':
            new_registration = Registration(
                registration_type='organization',
                company_name=data.get('companyName'),
                company_establishment_date=data.get('companyEstablishmentDate'),
                phone_number=data.get('phoneNumber'),
                branch_location=data.get('branchLocation'),# Include branch location here
                email=data.get('email'),
                company_address=data.get('companyAddress'),
                password=data.get('password'),
            )
            
        elif registration_type == 'freelancer':
            new_registration = Registration(
                registration_type='freelancer',
                freelancer_name=data.get('freelancerName'),
                freelancer_dob=data.get('freelancerDOB'),
                freelancer_contact_number=data.get('freelancerContactNumber'),
                freelancer_email=data.get('freelancerEmail'),
                freelancer_password=data.get('password'),
                
            ) 
            print(new_registration)
           
        elif registration_type == 'customer':
            new_registration = Registration(
                registration_type='customer',
                customer_name=data.get('customerName'),
                customer_contact_number=data.get('customerContactNumber'),
                customer_email=data.get('customerEmail'),
                customer_password=data.get('password'),
            )
        else:
            return jsonify({'message': 'Invalid registration type'}), 400

        db.session.add(new_registration)
        db.session.commit()

        return jsonify({'message': 'Registration successful'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'Registration failed'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        print('Received login data:', data) 

        # Retrieve user based on username or email
        user = Registration.query.filter(
            (Registration.company_name == data['username'] and Registration.registration_type == 'organization') |
            (Registration.freelancer_name == data['username'] and Registration.registration_type == 'freelancer') |
            (Registration.customer_name == data['username'] and Registration.registration_type == 'customer')
        ).first()

        if user:
            print('Stored password:', user.password if user.registration_type != 'freelancer' else user.freelancer_password)
            
            # Check the correct attribute based on registration type
            stored_password = user.password if user.registration_type != 'freelancer' else user.freelancer_password
            stored_password = stored_password if user.registration_type != 'customer' else user.customer_password

            if stored_password and stored_password == data['password']:
                return jsonify({'message': 'Login successful'})
            else:
                return jsonify({'message': 'Invalid password'}), 401
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Login failed. Please try again.'}), 500

# Other routes and configurations...
@app.route('/get-organization-details', methods=['GET'])
def get_organization_details():
    try:
        organization_details = Registration.query.filter_by(registration_type='organization').first()
        if organization_details:
            return jsonify({
                'company_name': organization_details.company_name,
                'company_establishment_date': organization_details.company_establishment_date,
                'phone_number': organization_details.phone_number,
                'email': organization_details.email,
                'company_address': organization_details.company_address,
                'branch_location': organization_details.branch_location,  # Include branch location here
            })
        else:
            return jsonify({'message': 'Organization details not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching organization details'}), 500


@app.route('/get-freelancer-details', methods=['GET'])
def get_freelancer_details():
    try:
        freelancer_details = Registration.query.filter_by(registration_type='freelancer').all()
        if freelancer_details:
            return jsonify({
                'freelancer_name': freelancer_details.freelancer_name,
                'freelancer_dob': freelancer_details.freelancer_dob,
                'freelancer_contact_number': freelancer_details.freelancer_contact_number,
                'freelancer_email': freelancer_details.freelancer_email,
            })
        else:
            return jsonify({'message': 'Freelancer details not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching freelancer details'}), 500

@app.route('/get-customer-details', methods=['GET'])
def get_customer_details():
    try:
        customer_details = Registration.query.filter_by(registration_type='customer').all()
        if customer_details:
            return jsonify({
                'customer_name': customer_details.customer_name,
                'customer_contact_number': customer_details.customer_contact_number,
                'customer_email': customer_details.customer_email,
            })
        else:
            return jsonify({'message': 'Customer details not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching customer details'}), 500
    
@app.route('/get-company-names', methods=['GET'])
def get_company_names():
    try:
        # Retrieve distinct company names directly from the database
        company_names = Registration.query.filter_by(registration_type='organization') \
                          .distinct(Registration.company_name) \
                          .with_entities(Registration.company_name) \
                          .all()

        unique_company_names = list(set([name[0] for name in company_names]))
        print('Unique Company Names:', unique_company_names)  # Add this line for debugging

        return jsonify({'companyNames': unique_company_names})
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching company names'}), 500


    

@app.route('/get-details-by-company', methods=['GET', 'POST'])
def get_details_by_company():
    try:
        data = request.json
        company = data.get('company')
        org_type = data.get('type')
        branch = data.get('branch')

        # Fetch details based on company, organization type, and branch location
        details = Registration.query.filter_by(company_name=company, registration_type=org_type, branch_location=branch).all()


        if details:
            # To Construct a list of details for all locations
            details_list = []
            for entry in details:
                details_list.append({
                    'company_name': entry.company_name,
                    'company_establishment_date': entry.company_establishment_date,
                    'phone_number': entry.phone_number,
                    'email': entry.email,
                    'company_address': entry.company_address,
                    'branch_location': entry.branch_location,
                    # Add other details as needed
                })

            # Return the list of details as a JSON response
            return jsonify({'details': details_list})
        else:
            return jsonify({'message': 'Details not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching details'}), 500
    
@app.route('/get-branch-locations', methods=['GET'])
def get_branch_locations():
    try:
        company = request.args.get('company')

        # Fetch branch locations based on the selected company
        locations = Registration.query.filter_by(company_name=company, registration_type='organization').with_entities(Registration.branch_location).distinct()

        if locations:
            # Convert the result to a list of branch locations
            branch_locations = [loc[0] for loc in locations]
            return jsonify({'branchLocations': branch_locations})
        else:
            return jsonify({'message': 'Branch locations not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error fetching branch locations'}), 500

    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)