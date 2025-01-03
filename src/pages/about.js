import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import TimeStampSection from '../components/timestamp-section';
import ProjectSection from '../components/project-section';
import AwardsSection from '../components/awards-section';
import CertificationSection from '../components/certification-section';

function AboutPage({ data }) {
  const metaData = data.site.siteMetadata;
  const { author, about, language } = metaData;
  const { timestamps, projects, awards, certification } = about;
  return (
    <Layout>
      <Seo title="ABOUT" />
      <Bio author={author} language={language} />
      <TimeStampSection timestamps={timestamps} />
      <ProjectSection projects={projects} />
      <AwardsSection awards={awards} />
      <CertificationSection certification={certification} />
    </Layout>
  );
}

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        language
        author {
          name
          bio {
            role
            description
            thumbnail
          }
          social {
            github
            instagram
            email
          }
        }

        about {
          timestamps {
            date
            activity
            links {
              post
              github
              demo
              googlePlay
              appStore
            }
          }

          awards {
            date
            activity
            role
            links {
              post
              github
              demo
              googlePlay
              appStore
              url
            }
          }

          certification {
            date
            activity
            links {
              post
              github
              demo
              googlePlay
              appStore
            }
          }

          projects {
            title
            description
            techStack
            thumbnailUrl
            links {
              post
              github
              demo
              googlePlay
              appStore
            }
          }
        }
      }
    }
  }
`;
