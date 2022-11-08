import {FC, Fragment} from "react";
import {Page, Text, View, Document, StyleSheet, Font, Link, Image} from '@react-pdf/renderer';
// import IranSanseL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Light.ttf'
// import IranSanseB from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Bold.ttf'
// import IranSanseUL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_UltraLight.ttf'
// import IranSanse from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum).ttf'
import IranSanseL from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_Light.woff'
import IranSanseB from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_Bold.woff'
import IranSanseUL from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_UltraLight.woff'
import IranSanse from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum).woff'
import MobileIcon from '../../../assets/smartphone2.png'
import EnvelopeIcon from '../../../assets/envelope2.png'
import LocationIcon from '../../../assets/location-pin2.png'
import PersianText from "../PersianText/PersianText";
import Star from "../PDFTemplate1/Star";
import {EducationItem} from "../EducationForm/EducationForm";
import {JobExperienceItem} from "../JobExperienceForm/JobExperienceForm";
import {CertificateItem} from "../CertificateForm/CertificateForm";
import {LanguageItem} from "../LanguageForm/LanguageForm";
import {SkillItem} from "../SkillForm/SkillForm";
import {SocialMediaItem} from "../SocialMediaForm/SocialMediaForm";
import {ProjectItem} from "../ProjectForm/ProjectForm";
import {Resume} from "../PDFTemplate6/PDFTemplate6";
Font.register( {
  family: "IranSanse",
  fonts: [
    {src: IranSanseL, fontStyle: 'light'},
    {src: IranSanseUL, fontStyle: 'ultralight'},
    {src: IranSanseB, fontStyle: 'bold'},
    {src: IranSanse, fontStyle: 'normal'},
    {src: IranSanse, fontStyle: 'lightnormal', fontWeight: 'thin'},
  ]
} );

const styles = StyleSheet.create( {
  page: {
    fontFamily: 'IranSanse',
    borderLeft: 12,
    borderRight: 12,
    borderColor: '#064c80'
  },
  img: {
    width: 10,
    height: 10,
    margin: '2 0 auto 8',
  },
  name: {
    flexDirection: 'row-reverse',
  },
  section: {
    flexDirection: 'row-reverse',
    // marginBottom: 20,
  },
  sectionTitle: {
    width: '16%',
    padding: '0 4',
    margin: 4,
    color: '#064c80',
    marginLeft: 10
  },
  rect: {
    width: 10,
    height: 26,
    marginRight: -10,
    backgroundColor: '#064c80'
  },
  description: {
    width: '82%',
    borderRight: 1,
    borderColor: '#064c80',
    padding: '4 12',
    marginRight: -1,
  },
  innerDescription: {
    flexDirection: 'row-reverse',
    margin: '6 0'
  },
  date: {
    width: 65,
    color: '#064c80'
  },
  languageItem: {
    width: 40,
    textAlign: 'center'
  },
  progressBorder: {
    flexDirection: 'row-reverse',
    width: 100,
    height: 1.5,
    backgroundColor: '#e5e5e5'
  },
  progressFill20: {
    width: '20%',
    backgroundColor: '#064c80',
    height: 1.5,
  },
  progressFill40: {
    width: '40%',
    backgroundColor: '#064c80',
    height: 1.5,
  },
  progressFill60: {
    width: '60%',
    backgroundColor: '#064c80',
    height: 1.5,
  },
  progressFill80: {
    width: '80%',
    backgroundColor: '#064c80',
    height: 1.5,
  },
  progressFill100: {
    width: '100%',
    backgroundColor: '#064c80',
    height: 1.5,
  },
  ratingStar: {
    color: '#064c80',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  link: {
    backgroundColor: '#064c80',
    borderRadius: 6,
    color: 'white',
    padding: '3 6 1 3',
    textDecoration: 'none',
    width: 100,
    fontSize: 10,
    alignItems: 'center'
  },
  skillsItem: {
    padding: '2 6 1 3',
    border: 1,
    borderColor: '#064c80',
    borderRadius: 4,
    marginLeft: 4,
    marginBottom: 4,
    fontSize: 10,
  },
  projectLink: {
    flexDirection: 'row-reverse',
    fontSize: 10
  },
} )

interface Props {
  resume: Resume
}


const PDFTemplate4: FC<Props> = ( {resume} ) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{width: '102%', height: 12, backgroundColor: '#064c80', marginLeft: -2}} />
        {resume.basicInformation &&
          <View style={{flexDirection: 'row-reverse', marginTop: 22}}>
            <View style={{width: '46%', backgroundColor: '#064c80', height: 80, marginRight: -2, color: 'white', paddingRight: 24, paddingTop: 12}}>
              {( resume.basicInformation.lastName !== '' || resume.basicInformation.firstName !== '' ) &&
                <View style={styles.name}>
                  {resume.basicInformation.firstName !== '' && <PersianText text={resume.basicInformation.firstName} fontStyle={"bold"} fontSize={19} marginTop={0} marginBottom={0} />}
                  {resume.basicInformation.lastName !== '' && <PersianText text={resume.basicInformation.lastName} fontStyle={"bold"} fontSize={19} marginTop={0} marginBottom={0} />}
                </View>
              }
              <View style={{color: '#cdcdcd'}}>
                {resume.basicInformation.jobTitle !== '' &&
                  <PersianText text={resume.basicInformation.jobTitle} fontStyle={"bold"} fontSize={10} marginTop={2} marginBottom={0} />
                }
              </View>
            </View>
            {( resume.basicInformation.email !== '' || resume.basicInformation.mobileNumber !== '' || resume.basicInformation.city !== '' || resume.basicInformation.address !== '' ) &&
              <View style={{width: '30%', marginRight: 10}}>
                <View>
                  {resume.basicInformation.email !== '' &&
                    <View style={{flexDirection: 'row-reverse', marginBottom: 8}}>
                      <Image style={styles.img} src={EnvelopeIcon} />
                      <PersianText text={resume.basicInformation.email} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />
                    </View>}
                  {resume.basicInformation.mobileNumber !== '' &&
                    <View style={{flexDirection: 'row-reverse', marginBottom: 8}}>
                      <Image style={styles.img} src={MobileIcon} />
                      <PersianText text={resume.basicInformation.mobileNumber} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />
                    </View>}
                  {( resume.basicInformation.city !== '' || resume.basicInformation.address !== '' ) &&
                    <View style={{flexDirection: 'row-reverse'}}>
                      <Image style={styles.img} src={LocationIcon} />
                      {resume.basicInformation.city !== '' && <PersianText text={resume.basicInformation.city} fontStyle={"light"} fontSize={9} marginTop={0} marginBottom={0} />}
                      {resume.basicInformation.city !== '' && resume.basicInformation.address !== '' && <PersianText text={'- '} fontStyle={"light"} fontSize={9} marginTop={0} marginBottom={0} />}
                      {resume.basicInformation.address !== '' && <PersianText text={`${resume.basicInformation.address}`} fontStyle={"light"} fontSize={9} marginTop={0} marginBottom={0} />}
                    </View>
                  }
                </View>
              </View>
            }
            <View style={{width: '24%', marginRight: 10}}>
              {resume.basicInformation.birthDate !== '' &&
                <View style={{flexDirection: 'row-reverse', marginBottom: 2}}>
                  <View style={{width: 7, height: 2.2, backgroundColor: '#013c68', marginTop: 7, marginLeft: 4}}></View>
                  <PersianText text={`متولد: ${resume.basicInformation.birthDate}`} fontStyle={"lightnormal"} fontSize={8} marginTop={0} marginBottom={0} />
                </View>}
              {resume.basicInformation.maritalStatus !== '' &&
                <View style={{flexDirection: 'row-reverse', marginBottom: 2}}>
                  <View style={{width: 7, height: 2.2, backgroundColor: '#013c68', marginTop: 7, marginLeft: 4}}></View>
                  <PersianText text={`وضعیت تاهل: ${resume.basicInformation.maritalStatus}`} fontStyle={"lightnormal"} fontSize={8} marginTop={0} marginBottom={0} />
                </View>}
              {resume.basicInformation.soldieringStatus !== '' &&
                <View style={{flexDirection: 'row-reverse', }}>
                  <View style={{width: 7, height: 2.2, backgroundColor: '#013c68', marginTop: 7, marginLeft: 4}}></View>
                  <PersianText text={`وضعیت سربازی: ${resume.basicInformation.soldieringStatus}`} fontStyle={"lightnormal"} fontSize={8} marginTop={0} marginBottom={0} />
                </View>}
            </View>
          </View>
        }
        <View style={{marginTop: 20}}>
          <View style={{marginBottom: 20}}>
            {
              resume.aboutMe && resume.aboutMe.description !== '' &&
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <PersianText text={"درباره من"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                </View>
                <View style={styles.rect}></View>
                <View style={styles.description}>
                  {resume.aboutMe.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} /> )}
                </View>
              </View>
            }
          </View>
          {resume.educationItem.length !== 0 &&
            <View style={{marginBottom: 20}}>
              {
                resume.educationItem.map( ( educationItem: EducationItem, i: number ) => {
                  return (
                    <View key={i} style={styles.section} wrap={false}>
                      <View style={styles.sectionTitle}>
                        {i === 0 &&
                          <PersianText text={"سوابق تحصیلی"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                        }
                      </View>
                      {i === 0 &&
                        <View style={styles.rect}></View>
                      }
                      <View style={styles.description}>
                        <View style={styles.innerDescription}>
                          <View style={styles.date}>
                            <PersianText text={`${educationItem.startDate}${educationItem.startDate && educationItem.startDate && ' - '}${educationItem.endDate}`} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} />
                          </View>
                          <View style={{border: 1, borderColor: '#064c80', height: 9, marginLeft: 10, marginTop: 4}}>
                            <View style={{width: 4, height: 4, backgroundColor: '#064c80', margin: 1.5}}></View>
                          </View>
                          <View>
                            <PersianText text={`${educationItem.degree} ${educationItem.study}`} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                            <PersianText text={educationItem.university} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                } )
              }
            </View>
          }
          {resume.jobExperienceItem.length !== 0 &&
            <View style={{marginBottom: 20}}>
              {
                resume.jobExperienceItem.map( ( jobExperienceItem: JobExperienceItem, i: number ) => {
                  return (
                    <View key={i} style={styles.section} wrap={false}>
                      <View style={styles.sectionTitle}>
                        {i === 0 &&
                          <PersianText text={"سوابق شغلی"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                        }
                      </View>
                      {i === 0 &&
                        <View style={styles.rect}></View>
                      }
                      <View style={styles.description}>
                        <View style={styles.innerDescription}>
                          <View style={styles.date}>
                            <PersianText text={`${jobExperienceItem.startDate}${jobExperienceItem.startDate && jobExperienceItem.startDate && ' - '}${jobExperienceItem.endDate}`} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} />
                          </View>
                          <View style={{border: 1, borderColor: '#064c80', height: 9, marginLeft: 10, marginTop: 4}}>
                            <View style={{width: 4, height: 4, backgroundColor: '#064c80', margin: 1.5}}></View>
                          </View>
                          <View>
                            <PersianText text={jobExperienceItem.jobPosition} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                            <PersianText text={jobExperienceItem.companyName} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                } )
              }
            </View>
          }
          {resume.certificateItem.length !== 0 &&
            <View style={{marginBottom: 20}}>
              {
                resume.certificateItem.map( ( certificateItem: CertificateItem, i: number ) => {
                  return (
                    <View key={i} style={styles.section} wrap={false}>
                      <View style={styles.sectionTitle}>
                        {i === 0 &&
                          <PersianText text={"دوره ها و گواهی نامه ها"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                        }
                      </View>
                      {i === 0 &&
                        <View style={styles.rect}></View>
                      }
                      <View style={styles.description}>
                        <View style={styles.innerDescription}>
                          <View style={styles.date}>
                            <PersianText text={`${certificateItem.startDate}${certificateItem.startDate && certificateItem.startDate && ' - '}${certificateItem.endDate}`} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} />
                          </View>
                          <View style={{border: 1, borderColor: '#064c80', height: 9, marginLeft: 10, marginTop: 4}}>
                            <View style={{width: 4, height: 4, backgroundColor: '#064c80', margin: 1.5}}></View>
                          </View>
                          <View>
                            <PersianText text={certificateItem.certificateName} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                            <PersianText text={certificateItem.institution} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                } )
              }
            </View>
          }
          {
            resume.languageItem.length !== 0 &&
            <View style={{marginBottom: 20}} wrap={false}>
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <PersianText text={"زبان"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                </View>
                <View style={styles.rect}></View>
                <View style={styles.description}>
                  <View style={{flexDirection: 'row-reverse', flexWrap: 'wrap'}}>
                    {
                      resume.languageItem.map( ( languageItem: LanguageItem, i: number ) => {
                        return (
                          <View key={i} style={{textAlign: 'center', width: 100, alignItems: 'center', marginLeft: 10, marginBottom: 10}}>
                            <PersianText text={languageItem.languageName} fontStyle={"normal"} fontSize={10} marginTop={0} marginBottom={2} />
                            {
                              languageItem.level === 'زبان مادری' ?
                                <View>
                                  <View style={styles.progressBorder}>
                                    <View style={styles.progressFill100}></View>
                                  </View>
                                  <View style={styles.ratingStar}>
                                    <PersianText text={'زبان مادری'} fontStyle={"normal"} fontSize={9} marginTop={0} marginBottom={0} />
                                  </View>
                                </View>
                                :
                                languageItem.level === 'مبتدی' ?
                                  <View>
                                    <View style={styles.progressBorder}>
                                      <View style={styles.progressFill20}></View>
                                    </View>
                                    <View style={styles.ratingStar}>
                                      <Star color='#064c80' />
                                    </View>
                                  </View>
                                  :
                                  languageItem.level === 'پایین تر متوسط' ?
                                    <View>
                                      <View style={styles.progressBorder}>
                                        <View style={styles.progressFill40}></View>
                                      </View>
                                      <View style={styles.ratingStar}>
                                        <Star color='#064c80' /><Star color='#064c80' />
                                      </View>
                                    </View>
                                    :
                                    languageItem.level === 'متوسط' ?
                                      <View>
                                        <View style={styles.progressBorder}>
                                          <View style={styles.progressFill60}></View>
                                        </View>
                                        <View style={styles.ratingStar}>
                                          <Star color='#064c80' /><Star color='#064c80' /><Star color='#064c80' />
                                        </View>
                                      </View>
                                      :
                                      languageItem.level === 'بالا تر از متوسط' ?
                                        <View>
                                          <View style={styles.progressBorder}>
                                            <View style={styles.progressFill80}></View>
                                          </View>
                                          <View style={styles.ratingStar}>
                                            <Star color='#064c80' /><Star color='#064c80' /><Star color='#064c80' /><Star color='#064c80' />
                                          </View>
                                        </View>
                                        :
                                        languageItem.level === 'پیشرفته' ?
                                          <View>
                                            <View style={styles.progressBorder}>
                                              <View style={styles.progressFill100}></View>
                                            </View>
                                            <View style={styles.ratingStar}>
                                              <Star color='#064c80' /><Star color='#064c80' /><Star color='#064c80' /><Star color='#064c80' /><Star color='#064c80' />
                                            </View>
                                          </View>
                                          :
                                          <Fragment></Fragment>

                            }
                          </View>
                        )
                      } )
                    }
                  </View>
                </View>
              </View>
            </View>
          }
          {
            resume.skillItem.length !== 0 &&
            <View style={{marginBottom: 20}} wrap={false}>
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <PersianText text={"مهارت ها"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                </View>
                <View style={styles.rect}></View>
                <View style={styles.description}>
                  <View style={{flexDirection: 'row-reverse', flexWrap: 'wrap'}}>
                    {
                      resume.skillItem.map( ( skillItem: SkillItem, i: number ) => {
                        return (
                          <View key={i} style={styles.skillsItem}>
                            <PersianText text={skillItem.skillName} fontStyle={"normal"} fontSize={10} marginTop={0} marginBottom={0} />
                          </View>
                        )
                      } )
                    }
                  </View>
                </View>
              </View>
            </View>
          }
          {
            resume.socialMediaItem.length !== 0 &&
            <View style={{marginBottom: 20}} wrap={false}>
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <PersianText text={"شبکه های اجتماعی"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                </View>
                <View style={styles.rect}></View>
                <View style={styles.description}>
                  <View style={{flexDirection: 'row-reverse', flexWrap: 'wrap'}}>
                    {
                      resume.socialMediaItem.map( ( socialMediaItem: SocialMediaItem, i: number ) => {
                        return (
                          <View key={i} style={{textAlign: 'center', width: 100, alignItems: 'center', marginLeft: 10, marginBottom: 10}}>
                            <Link style={styles.link} src={socialMediaItem.link}>
                              <PersianText text={socialMediaItem.title} fontStyle={"normal"} fontSize={10} marginTop={0} marginBottom={2} />
                            </Link>
                          </View>
                        )
                      } )
                    }
                  </View>
                </View>
              </View>
            </View>
          }
          {resume.projectItem.length !== 0 &&
            <View style={{marginBottom: 20}}>
              {resume.projectItem.map( ( projectItem: ProjectItem, i: number ) => {
                return (
                  <View key={i} style={styles.section} wrap={false}>
                    <View style={styles.sectionTitle}>
                      {i === 0 && <PersianText text={"پروژه ها"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />}
                    </View>
                    {i === 0 && <View style={styles.rect}></View>}
                    <View style={styles.description}>
                      <View style={styles.innerDescription}>
                        <View style={styles.date}>
                          <PersianText text={`${projectItem.startDate}${projectItem.startDate && projectItem.endDate && ' - '}${projectItem.endDate}`} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} />
                        </View>
                        <View style={{border: 1, borderColor: '#064c80', height: 9, marginLeft: 10, marginTop: 4}}>
                          <View style={{width: 4, height: 4, backgroundColor: '#064c80', margin: 1.5}}></View>
                        </View>
                        <View>
                          <PersianText text={`${projectItem.title}${projectItem.title && projectItem.employer && ' - '}${projectItem.employer}`} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                          {
                            projectItem.description && projectItem.description !== '' &&
                            <Fragment>
                              <PersianText text={'توضیحات:'} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                              {projectItem.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={1} marginBottom={0} /> )}
                            </Fragment>
                          }
                          {projectItem.link && projectItem.link !== '' &&
                            <Fragment>
                              <PersianText text={`لینک پروژه:`} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                              <Link style={styles.projectLink} src={projectItem.link}>
                                <Text>{projectItem.link}</Text>
                              </Link>
                            </Fragment>
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                )
              } )}
            </View>
          }
        </View>
        <View style={{width: '102%', height: 12, backgroundColor: '#064c80', bottom: 0, position: 'absolute', marginLeft: -2}} />
      </Page>
    </Document>
  );
};

export default PDFTemplate4;
