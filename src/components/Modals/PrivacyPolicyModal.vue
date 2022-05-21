<template>
  <v-row justify="center">
    <v-dialog
      :value="value" @input="$emit('input', $event)"
      width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5 privacy-header">Privacy Policy</span>
        </v-card-title>
        <v-card-text>
       <v-card-subtitle>At Altitude, accessible from <b>http://www.altitude.fun</b>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Altitude and how we use it.If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</v-card-subtitle>


        <v-card-subtitle>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Altitude. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
</v-card-subtitle>

<v-card-title>Consent</v-card-title>
<v-card-subtitle>By using our website, you hereby consent to our Privacy Policy and agree to its terms.
</v-card-subtitle>
<v-card-title>Information we collect</v-card-title>
<v-card-subtitle>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.

If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.

When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
</v-card-subtitle>
<v-card-title>How we use your information</v-card-title>
<v-card-subtitle>We use the information we collect in various ways, including to:
<ul>
<li>Provide, operate, and maintain our website</li>
<li>Improve, personalize, and expand our website</li>
<li>Understand and analyze how you use our website</li>
<li>Develop new products, services, features, and functionality</li>
<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
</ul>
</v-card-subtitle>
<!-- Send you emails
Find and prevent fraud -->

<v-card-title>Log Files</v-card-title>
<v-card-subtitle>Altitude follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</v-card-subtitle>

<v-card-title>Cookies and Web Beacons</v-card-title>
<v-card-subtitle>Like any other website, Altitude uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</v-card-subtitle>

<v-card-subtitle><i>For more general information on cookies, please read the Cookies article on MDN's website.</i></v-card-subtitle>

<v-card-title>Advertising Partners Privacy Policies</v-card-title>
<v-card-subtitle>You may consult this list to find the Privacy Policy for each of the advertising partners of Altitude.</v-card-subtitle>
<v-card-subtitle>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Altitude, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</v-card-subtitle>


<v-card-subtitle><i>Note that Altitude has no access to or control over these cookies that are used by third-party advertisers.</i></v-card-subtitle>

<v-card-title>Third Party Privacy Policies</v-card-title>
<v-card-subtitle>Altitude's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
</v-card-subtitle>
<v-card-subtitle>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
</v-card-subtitle>

<v-card-title>CCPA Privacy Rights (Do Not Sell My Personal Information)</v-card-title>
<v-card-subtitle>Under the CCPA, among other rights, California consumers have the right to:</v-card-subtitle>

<v-card-subtitle>
    <ul>
    <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>

 <li>Request that a business delete any personal data about the consumer that a business has collected.
</li>
<li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
</ul>
</v-card-subtitle>

<v-card-title>GDPR Data Protection Rights</v-card-title>
<v-card-subtitle>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
</v-card-subtitle>
<v-card-subtitle>
    <ul>
<li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>

<li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>

<li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>

<li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>

<li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>

<li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
</ul>
</v-card-subtitle>

<v-card-title>Children's Information</v-card-title>
<v-card-subtitle>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Altitude does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
</v-card-subtitle>


        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
 export default {
     name: "PrivacyPolicyModal",
    data () {
      return {
        dialog: false,
      }
    },
      props: {
    value: {},
  },
  }
</script>

<style scoped>

.v-card {
    background: rgb(210, 225, 245);
}

.privacy-header {
    color: rgb(15, 14, 14) !important;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>